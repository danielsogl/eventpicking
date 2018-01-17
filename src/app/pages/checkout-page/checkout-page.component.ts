import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { User } from '../../classes/user';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';

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

  public user: User;

  public cartItems: ShoppingCartItem[];

  /**  */
  public contactDetailsStatus: string;
  /**  */
  public paymentDeliveryStatus: string;
  /**  */
  public checkOrderStatus: string;

  /**  */
  public template: TemplateRef<any>;
  /**  */
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  /**  */
  @ViewChild('checkoutContactDetails') checkoutContactDetails: TemplateRef<any>;
  /**  */
  @ViewChild('checkoutPaymentDelivery')
  checkoutPaymentDelivery: TemplateRef<any>;
  /**  */
  @ViewChild('checkoutCheckOrder') checkoutCheckOrder: TemplateRef<any>;

  constructor(
    private localStorage: AsyncLocalStorage,
    private afs: FirebaseStorageService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.setTemplate('contactDetails');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', this.user);
    });

    this.localStorage
      .getItem<ShoppingCartItem[]>('cart-items')
      .subscribe(items => {
        if (items) {
          this.cartItems = items;
        }
        this.log.d('Shopping cart items', this.cartItems);
      });
  }

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
