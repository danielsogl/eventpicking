/**
 * Debit payment interface
 */
export interface DebitPayment {
  /** Account holder */
  accountHolder: string;
  /** IBAN */
  iban: string;
  /** BIC */
  bic: string;
}
