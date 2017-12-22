/**
 * Debit payment interface
 * @author Daniel Sogl
 */
export interface DebitPayment {
  /** Account holder */
  accountHolder: string;
  /** IBAN */
  iban: string;
  /** BIC */
  bic: string;
}
