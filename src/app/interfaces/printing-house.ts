import { Address } from './address';
import { PrintingHousePrices } from '../classes/price-list';

/**
 * Printing house interface
 * @author Daniel Sogl
 */
export interface PrintingHouse {
  /** Address */
  address: Address;
  /** Payment information */
  paymentInformation: PaymentInformation;
  /** Pricing list for the default printing house */
  printingHouseItems?: PrintingHousePrices[];
  /** User UID */
  uid: string;
  /** Default printinghouse */
  isDefault: boolean;
  /** Id */
  id: string;
}

export interface PaymentInformation {
  accountOwner: string;
  bic: string;
  iban: string;
}
