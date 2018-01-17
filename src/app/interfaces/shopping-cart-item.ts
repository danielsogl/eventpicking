import { ShoppingCartItemFormat } from './shopping-cart-item-format';

/**
 * Shopping cart item interface
 * @author Daniel Sogl
 */
export interface ShoppingCartItem {
  /** Name */
  eventname: string;
  /** photoname */
  name: string;
  /** Format */
  format: ShoppingCartItemFormat;
  /** Image-Url Thumbnail */
  url: string;
  /** Amount */
  amount?: number;
  /** Total price */
  totalPrice?: number;
}
