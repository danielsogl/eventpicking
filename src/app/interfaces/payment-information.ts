/**
 * Payment information interface
 * @author Daniel Sogl
 */
export interface PaymentInformation {
  /** Account owner */
  accountOwner: string;
  /** BIC */
  bic: string;
  /** IBAN */
  iban: string;
}
