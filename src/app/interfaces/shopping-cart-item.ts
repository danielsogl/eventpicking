/**
 * Shopping cart item interface
 * @author Daniel Sogl
 */
export interface ShoppingCartItem {
  /** Name */
  eventname: string;
  /** Key ->photoname */
  key: string;
  /** Format */
  format: ShoppingCartItemFormat;
  /** Image-Url Thumbnail */
  url: string;
  /** Amount */
  amount?: number;
  /** Total price */
  totalPrice?: number;
}

/**
 * Shopping cart item format interface
 * @author Daniel Sogl
 */
export interface ShoppingCartItemFormat {
  /** Type */
  type: string;
  /** Price */
  price: number;
  /** Height */
  height?: number;
  /** Width */
  width?: number;
}
