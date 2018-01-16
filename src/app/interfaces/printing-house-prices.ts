import { PRINTTYPE } from '../enums/print-type';
import { PrintingHouseArticle } from './printing-house-article';

/**
 * Printing House Item Interface
 * @author Daniel Sogl
 */
export interface PrintingHousePrices {
  /** Price type */
  name: PRINTTYPE;
  /** Articles */
  articles: PrintingHouseArticle[];
}
