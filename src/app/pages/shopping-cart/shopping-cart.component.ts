import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import { SHOPPINGCARTITEMTYPE } from '../../enums/shopping-cart-item-type';
import * as localforage from 'localforage';

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
  /** Sum */
  public sum: number;
  /** checkType variable */
  public checkType: any = SHOPPINGCARTITEMTYPE;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Load items from local storage
    localforage.ready().then(() => {
      localforage.getItem<ShoppingCartItem[]>('cart-items').then(items => {
        if (items) {
          this.log.d('Cart items', items);
          this.cartItems = items;
          this.cartItems.sort((a, b) => {
            if (a.eventname < b.eventname) {
              return -1;
            }
            if (a.eventname > b.eventname) {
              return 1;
            }
            return 0;
          });
        }
        this.calculateSum();
      });
    });
  }

  /**
   * Calculate sum of all ShoppingCartItems total prices
   */
  calculateSum() {
    this.sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.calculateTotalPrice(this.cartItems[i]);
      this.sum += this.cartItems[i].price * this.cartItems[i].amount;
    }
  }

  /**
   * Decrease shopping cart item amount
   * @param  {ShoppingCartItem} cartItem Item
   */
  decreaseQuantity(cartItem: ShoppingCartItem) {
    if (cartItem.amount > 1) {
      cartItem.amount--;
    }
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount decremented. Event: ' + cartItem.name + ' ' + cartItem.eventname
    );
  }

  /**
   * Increase shopping cart item amount
   * @param  {ShoppingCartItem} cartItem Item
   */
  increaseQuantity(cartItem: ShoppingCartItem) {
    cartItem.amount++;
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount incremented. Event: ' + cartItem.name + ' ' + cartItem.eventname
    );
  }

  /**
   * calculate the total price of a shoppingcart position
   * @param  {ShoppingCartItem} cartItem Item
   */
  calculateTotalPrice(cartItem: ShoppingCartItem) {
    cartItem.totalPrice = cartItem.amount * cartItem.price;
  }

  /**
   * Delete shopping cart item
   * @param  {ShoppingCartItem} cartItem Item
   */
  deleteCartItem(index: number) {
    this.cartItems.splice(index, 1);
    localforage.setItem('cart-items', this.cartItems);
    this.calculateSum();
  }
}
