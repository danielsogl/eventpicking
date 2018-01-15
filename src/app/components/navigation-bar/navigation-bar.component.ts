import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Log } from 'ng2-logger';

import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

/**
 * Navigation bar component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  /** Logger */
  private log = Log.create('NavigationBarComponent');
  /** Number of cart items */
  public cartItems: number;

  /** User */
  public user: any;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {AsyncLocalStorage} localStorage Local storage
   */
  constructor(
    private auth: FirebaseAuthService,
    private localStorage: AsyncLocalStorage
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.localStorage
      .getItem<ShoppingCartItem[]>('cart-items')
      .subscribe(items => {
        if (items) {
          this.cartItems = items.length;
        }
        this.log.d('Shopping cart items', this.cartItems);
      });
  }

  /**
   * Initlaize Component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

  /**
   * Logout user
   */
  logout() {
    this.auth.signOut().then(() => {
      this.user = null;
    });
  }
}
