/**
 * Shopping cart item interface
 * @author Daniel Sogl
 */
export interface ShoppingCartItem {
  /** Name */
  name: string;
  /** Key */
  key: string;
  /** Format */
  format: ShoppingCartItemFormat;
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
  /** Heigh */
  heigh?: number;
  /** Width */
  width?: number;
}
