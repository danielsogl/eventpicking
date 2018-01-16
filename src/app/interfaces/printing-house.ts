import { Address } from './address';
import { PaymentInformation } from './payment-information';
import { PrintingHousePrices } from './printing-house-prices';

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
