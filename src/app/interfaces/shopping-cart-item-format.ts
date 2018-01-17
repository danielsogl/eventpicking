import { SHOPPINGCARTITEMTYPE } from '../enums/shopping-cart-item-type';

/**
 * Shopping cart item format interface
 * @author Daniel Sogl
 */
export interface ShoppingCartItemFormat {
  /** Type */
  type: SHOPPINGCARTITEMTYPE;
  /** Price */
  price: number;
  /** Height */
  height?: number;
  /** Width */
  width?: number;
}
