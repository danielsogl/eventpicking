import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Checkout page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  private log = Log.create('CheckoutPageComponent');

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
