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
