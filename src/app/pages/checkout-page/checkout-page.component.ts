import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { User } from '../../classes/user';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import * as localforage from 'localforage';
import { environment } from '../../../environments/environment';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { Transaction, TransactionItem } from '../../interfaces/transaction';
import { CURRENCY } from '../../enums/currency';
import { COUNTRY } from '../../enums/country';
import { NavigationService } from '../../services/navigation/navigation.service';

declare let paypal: any;

/**
 * Checkout page component
 * @author Daniel Sogl, Anna Riesch
 */
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('CheckoutPageComponent');

  /** User */
  public user: User;

  /** Cart items */
  public cartItems: ShoppingCartItem[];
  public paypalItems: TransactionItem[] = [];

  /** contactDetailsStatus */
  public contactDetailsStatus: string;
  /** paymentDeliveryStatus */
  public paymentDeliveryStatus: string;
  /** checkOrderStatus */
  public checkOrderStatus: string;

  /** Display loading */
  public didPaypalScriptLoad = false;
  /** Loading */
  public loading = true;
  /** Payment amount */
  public paymentAmount = 0;
  /** Payment amount with taxes and fees */
  public paymentTotalAmount = 0; /** Payment amount */

  /** paypal config */
  public paypalConfig: any;

  /** Invoice number */
  public invoice_number: string;

  public transaction: Transaction;

  /** template */
  public template: TemplateRef<any>;
  /** loadingTmpl */
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  /** checkoutContactDetails */
  @ViewChild('checkoutContactDetails') checkoutContactDetails: TemplateRef<any>;
  /** checkoutPaymentDelivery */
  @ViewChild('checkoutPaymentDelivery')
  checkoutPaymentDelivery: TemplateRef<any>;
  /** checkoutCheckOrder */
  @ViewChild('checkoutCheckOrder') checkoutCheckOrder: TemplateRef<any>;

  /**
   * Constructor
   * @param {FirebaseStorageService} afs Firebase Storage Service
   * @param {FirebaseAuthService} auth Firebase Auth Service
   * @param {NavigationService} navigation Navigation Service
   */
  constructor(
    private afs: FirebaseFirestoreService,
    private auth: FirebaseAuthService,
    private navigation: NavigationService
  ) {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.setTemplate('contactDetails');

    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.log.d('Loaded user', this.user);

        this.invoice_number = this.afs.getId();

        localforage
          .getItem<ShoppingCartItem[]>('cart-items')
          .then(items => {
            if (items) {
              this.cartItems = items;
              for (let i = 0; i < items.length; i++) {
                this.paypalItems.push({
                  currency: CURRENCY.EUR,
                  description: 'Ein Bild',
                  name: `${items[i].eventname}/${items[i].name}`,
                  price: items[i].price,
                  quantity: items[i].amount,
                  sku: items[i].itemType,
                  tax: 0.19
                });
                this.paymentAmount += items[i].price * items[i].amount;
              }
            }

            this.transaction = {
              invoice_number: this.invoice_number,
              description: 'EventPicking Bestellung',
              reference_id: this.auth.getCurrentFirebaseUser().uid,
              amount: {
                currency: CURRENCY.EUR,
                total: this.paymentAmount
              },
              item_list: {
                items: this.paypalItems,
                shipping_address: {
                  city: this.user.deliveryAdress.city,
                  country_code: COUNTRY.GERMANY,
                  line1: `${this.user.deliveryAdress.street} ${
                    this.user.deliveryAdress.streetnumber
                  }`,
                  phone: this.user.deliveryAdress.phone,
                  postal_code: this.user.deliveryAdress.zip,
                  recipient_name: `${this.user.deliveryAdress.name} ${
                    this.user.deliveryAdress.lastname
                  }`
                },
                shipping_method: 'DHL oder EMail',
                shipping_phone_number: this.user.deliveryAdress.phone
              }
            };

            this.log.d('Shopping cart items', this.cartItems);
            this.log.d('Translaction', this.transaction);
            this.paypalConfig = {
              env: 'sandbox',
              locale: 'de_DE',
              client: {
                sandbox: environment.paypal_sandbox
              },
              commit: true,
              payment: (data, actions) => {
                return actions.payment.create({
                  payment: {
                    transactions: [this.transaction]
                  }
                });
              },
              onAuthorize: (data, actions) => {
                return actions.payment.execute().then(payment => {
                  // Save transaction into firestore
                  this.transaction.date = new Date().toDateString();
                  this.transaction.status = 'pending';
                  this.transaction.email = this.auth.getCurrentFirebaseUser().email;
                  this.afs
                    .saveTransaction(this.transaction)
                    .then(() => {
                      this.log.d('Saved transaction');
                      this.navigation.navigateTo('payment-success');
                    })
                    .catch(err => {
                      this.log.er('Error saving transaction', err);
                    });
                });
              },
              onCancel: (data, actions) => {
                // Buyer cancelled the payment
                return;
              },

              onError: err => {
                // An error occurred during the transaction
                console.log('Error', err);
                return;
              }
            };
          })
          .catch(err => {
            this.log.er('Error loading local storage items');
          });
      }
    });
  }

  /**
   * Set template
   * @param  {string} template Template name
   */
  setTemplate(template: string) {
    switch (template) {
      case 'contactDetails':
        this.template = this.checkoutContactDetails;
        break;
      case 'paymentDelivery':
        this.template = this.checkoutPaymentDelivery;
        break;
      case 'checkOrder':
        this.template = this.checkoutCheckOrder;
        break;
      default:
        this.template = this.loadingTmpl;
        break;
    }
  }

  /**
   * Render paypal button
   */
  renderPaypalButton() {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  /**
   * Load paypal checkout script into DOM
   * @returns {Promise<any>}
   */
  loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
