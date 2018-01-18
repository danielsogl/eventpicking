import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { User } from '../../classes/user';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import * as localforage from 'localforage';
import { environment } from '../../../environments/environment';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

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
  public paypalItems: any[] = [];

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

  /** paypal config */
  public paypalConfig: any;

  /** Invoice number */
  public invoice_number: string;

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
   * @param  {FirebaseStorageService} afs Firebase Storage Service
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   */
  constructor(
    private afs: FirebaseFirestoreService,
    private auth: FirebaseAuthService
  ) {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.setTemplate('contactDetails');

    this.invoice_number = this.afs.getId();

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', this.user);
    });

    localforage.ready().then(() => {
      localforage.getItem<ShoppingCartItem[]>('cart-items').then(items => {
        if (items) {
          for (let i = 0; i < items.length; i++) {
            this.paypalItems.push({
              name: items[i].name,
              quantity: items[i].amount,
              price: items[i].price,
              currency: 'EUR',
              sku: items[i].eventname,
              description: items[i].itemType
            });
            this.paymentAmount += items[i].price * items[i].amount;
          }
        }

        this.log.d('Shopping cart items', this.cartItems);
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
                transactions: [
                  {
                    amount: {
                      total: this.paymentAmount,
                      currency: 'EUR',
                      details: {
                        subtotal: this.paymentAmount,
                        tax: 0.19
                      }
                    },
                    description: '',
                    invoice_number: '',
                    item_list: {
                      items: this.paypalItems,
                      shipping_address: {
                        recipient_name: `${this.user.deliveryAdress.name} ${
                          this.user.deliveryAdress.lastname
                        }`,
                        line1: `${this.user.deliveryAdress.street} ${
                          this.user.deliveryAdress.streetnumber
                        }`,
                        city: `${this.user.deliveryAdress.city}`,
                        country_code: 'DE',
                        postal_code: `${this.user.deliveryAdress.zip}`
                      }
                    }
                  }
                ]
              }
            });
          },
          onAuthorize: (data, actions) => {
            return actions.payment.execute().then(payment => {
              // show success page
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
      });
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
