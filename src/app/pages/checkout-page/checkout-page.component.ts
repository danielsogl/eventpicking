import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { User } from '../../classes/user';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import * as localforage from 'localforage';

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

  /** contactDetailsStatus */
  public contactDetailsStatus: string;
  /** paymentDeliveryStatus */
  public paymentDeliveryStatus: string;
  /** checkOrderStatus */
  public checkOrderStatus: string;

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
    private afs: FirebaseStorageService,
    private auth: FirebaseAuthService
  ) {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.setTemplate('contactDetails');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', this.user);
    });

    localforage
      .getItem<ShoppingCartItem[]>('cart-items')
      .then(items => {
        if (items) {
          this.cartItems = items;
        }
        this.log.d('Shopping cart items', this.cartItems);
      })
      .catch(err => {
        this.log.er('Error getting local storage items');
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
}
