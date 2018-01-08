import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Log } from 'ng2-logger';

import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';

/**
 * Shopping cart page component
 * @author Daniel Sogl, Tim Kriesler
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  /** Logger */
  private log = Log.create('ShoppingCartComponent');
  /** Shpping cart imtems */
  public cartItems: ShoppingCartItem[] = [];

  constructor(private localStorage: AsyncLocalStorage) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Load items from local storage
    this.localStorage
      .getItem<ShoppingCartItem>('_cart-items')
      .subscribe(items => {
        this.cartItems = items;
      });
  }
}
