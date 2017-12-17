import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private log = Log.create('ShoppingCartComponent');

  constructor() {}

  increaseQuantity() {}

  decreaseQuantity(oldQuantity: number): void {
    const newQuantity: number = oldQuantity--;
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
