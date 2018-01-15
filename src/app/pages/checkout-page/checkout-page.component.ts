import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

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

  /**  */
  public contactDetailsStatus: string;
  /**  */
  public paymentDeliveryStatus: string;
  /**  */
  public checkOrderStatus: string;

  public template: TemplateRef<any>;
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  @ViewChild('checkoutContactDetails') checkoutContactDetails: TemplateRef<any>;
  @ViewChild('checkoutPaymentDelivery')
  checkoutPaymentDelivery: TemplateRef<any>;
  @ViewChild('checkoutCheckOrder') checkoutCheckOrder: TemplateRef<any>;

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.setTemplate('contactDetails');
  }

  setTemplate(template: string) {
    switch (template) {
      case 'contactDetails':
        this.template = this.checkoutContactDetails;
        this.contactDetailsStatus = 'active';
        this.paymentDeliveryStatus = '';
        this.checkOrderStatus = '';
        break;
      case 'paymentDelivery':
        this.template = this.checkoutPaymentDelivery;
        this.contactDetailsStatus = '';
        this.paymentDeliveryStatus = 'active';
        this.checkOrderStatus = '';
        break;
      case 'checkOrder':
        this.template = this.checkoutCheckOrder;
        this.contactDetailsStatus = '';
        this.paymentDeliveryStatus = '';
        this.checkOrderStatus = 'active';
        break;

      default:
        this.template = this.loadingTmpl;
        break;
    }
  }
}
