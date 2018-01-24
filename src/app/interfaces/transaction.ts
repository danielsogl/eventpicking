import { COUNTRY } from '../enums/country';
import { CURRENCY } from '../enums/currency';
import { ImageInfo } from './image-info';

/**
 * A transaction defines what the payment is for and who fulfills the payment
 * @author Daniel Sogl
 */
export interface Transaction {
  /** The amount to collect. */
  amount: TransactionAmount;
  /** The purchase description. */
  description?: string | ImageInfo;
  /** The invoice number to track this payment. */
  invoice_number?: string;
  /** An array of items that are being purchased. */
  item_list?: TransactionItemList;
  /** Optional. The merchant-provided ID for the purchase unit. */
  reference_id?: string;
  /** Transaction date */
  date?: string;
  /** Status */
  status?: string;
  /** User email */
  email?: string;
  /** Photographer UID */
  photographer?: string;
}

/**
 * The amount to collect.
 * @author Daniel Sogl
 */
export interface TransactionAmount {
  /** The three-character ISO-4217 currency code. PayPal does not support all currencies. */
  currency: CURRENCY;
  /** The additional details about the payment amount. */
  details?: TransactionAmountDetails;
  /** The total amount charged to the payee by the payer. */
  total: number;
}

/**
 * The additional details about the payment amount.
 * @author Daniel Sogl
 */
export interface TransactionAmountDetails {
  /** The shipping fee */
  shipping?: number;
  /** The subtotal amount for the items */
  subtotal?: number;
  /** The tax */
  tax: number;
}

/**
 * An array of items that are being purchased
 * @author Daniel Sogl
 */
export interface TransactionItemList {
  /** An array of items that are being purchased. */
  items?: TransactionItem[];
  /** The shipping address details. */
  shipping_address?: TransactionAddress;
  /** The shipping method used for this payment, such as USPS Parcel  */
  shipping_method?: string;
  /** Enables merchants to share payer’s contact number with PayPal for the current payment. */
  shipping_phone_number?: string;
}

/**
 * Transaction Item
 * @author Daniel Sogl
 */
export interface TransactionItem {
  /** CIrrency */
  currency: CURRENCY;
  /** The item description. Supported only for the PayPal payment method. */
  description?: string;
  /** The item name. Maximum length is 127 characters. */
  name: string;
  /** The item cost. Maximum length is 10 characters, which includes: */
  price: number;
  /** The item quantity. Maximum length is 10 characters. */
  quantity: number;
  /** The stock keeping unit (SKU) for the item  */
  sku?: string;
  /** The URL to item information. Available to the payer in the transaction history. */
  url?: string;
  /** The item tax. Supported only for the PayPal payment method. */
  tax?: number;
  /** Download URL */
  downloadUrl?: string;
  /** Photographer UID */
  photographer?: string;
}

/**
 * The shipping address details.
 * @author Daniel Sogl
 */
export interface TransactionAddress {
  /** The city name. */
  city: string;
  /** A two-character ISO 3166-1 code that identifies the country or region. */
  country_code: COUNTRY;
  /** The first line of the address. For example, number, street, and so on. */
  line1: string;
  /** Optional. The second line of the address. For example, suite, apartment number, and so on. */
  line2?: string;
  /** The phone number, in E.123 format. Maximum length is 50 characters. */
  phone?: string;
  /** The postal code, which is the zip code or equivalent */
  postal_code?: string;
  /** The name of the recipient at this address. */
  recipient_name?: string;
}
