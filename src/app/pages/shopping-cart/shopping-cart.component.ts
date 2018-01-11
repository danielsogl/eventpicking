import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Log } from 'ng2-logger';

import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import { ITEMS } from '../shopping-cart/cartItems-mock-data';

/**
 * Shopping cart page component
 * @author Daniel Sogl, Tim Kriessler
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  /** Logger */
  private log = Log.create('ShoppingCartComponent');
  /** Shopping cart items */
  public cartItems: ShoppingCartItem[] = [];
  public sum: number;

  constructor(private localStorage: AsyncLocalStorage) {}

  /** Calculate sum of all ShoppingCartItems total prices */
  calculateSum() {
    this.sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.calculateTotalPrice(this.cartItems[i]);
      this.sum += this.cartItems[i].format.price * this.cartItems[i].amount;
    }
  }

  decreaseQuantity(cartItem: ShoppingCartItem) {
    if (cartItem.amount > 1) {
      cartItem.amount--;
    }
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount decremented. Event: ' + cartItem.key + ' ' + cartItem.eventname
    );
  }

  increaseQuantity(cartItem: ShoppingCartItem) {
    cartItem.amount++;
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount incremented. Event: ' + cartItem.key + ' ' + cartItem.eventname
    );
  }

  /** method to calculate the total price of a shoppingcart position */
  calculateTotalPrice(cartItem: ShoppingCartItem) {
    cartItem.totalPrice = cartItem.amount * cartItem.format.price;
  }

  deleteCartItem(cartItem: ShoppingCartItem) {
    for (let i = 0; i < this.cartItems.length; i++) {
      this.log.info('iterate: ' + this.cartItems[i].key);
      if (
        this.cartItems[i].eventname == cartItem.eventname &&
        this.cartItems[i].key == cartItem.key
      ) {
        this.log.info('delete: ' + this.cartItems[i].key);
        this.cartItems.splice(i, 1);
        this.calculateSum();
      }
    }
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Load items from local storage
    this.localStorage
      .getItem<ShoppingCartItem>('_cart-items')
      .subscribe(items => {
        if (items) {
          this.cartItems = items;
        } else {
          this.cartItems = ITEMS;
        }
        this.calculateSum();
      });
  }
}
