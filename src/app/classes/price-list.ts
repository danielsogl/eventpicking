/**
 * Price list class
 * @author Daniel Sogl
 */
export class PriceList {
  /** Download prices */
  downloadItems: DownloadPrice[];
  /** Printing house prices */
  printingHouseItems: PrintingHousePrices[];
  /** User UID */
  user: string;

  constructor(user: string) {
    this.user = user;
    this.downloadItems = [
      {
        name: 'XXS (max. 400px)',
        minPrice: 3.5,
        price: 3.5
      },
      {
        name: 'XS (max. 600px)',
        minPrice: 3.5,
        price: 3.5
      },
      {
        name: 'S (max. 800px)',
        minPrice: 5,
        price: 5
      },
      {
        name: 'M (max. 1200px)',
        minPrice: 8,
        price: 8
      },
      {
        name: 'L (max. 3000px)',
        minPrice: 13,
        price: 13
      },
      {
        name: 'XL (max. 5000px)',
        minPrice: 18,
        price: 18
      },
      {
        name: 'Original',
        minPrice: 20,
        price: 20
      }
    ];
    this.printingHouseItems = [
      {
        name: PRINTTYPE.PICTURE,
        articles: [
          { price: 0, heigh: 20, width: 30, minPrice: 1, name: '20x30 cm' },
          { price: 0, heigh: 30, width: 40, minPrice: 1.5, name: '30x40 cm' },
          { price: 0, heigh: 30, width: 45, minPrice: 2, name: '30x45 cm' },
          { price: 0, heigh: 40, width: 60, minPrice: 2.5, name: '40x60 cm' },
          { price: 0, heigh: 45, width: 60, minPrice: 3, name: '45x60 cm' },
          { price: 0, heigh: 50, width: 75, minPrice: 3.5, name: '50x75 cm' },
          { price: 0, heigh: 60, width: 80, minPrice: 4, name: '60x80 cm' }
        ]
      }
    ];
  }
}

/**
 * Download item interface
 * @author Daniel Sogl
 */
export interface DownloadPrice {
  /** Minimal price */
  minPrice: number;
  /** Item name */
  name: string;
  /** Constomer price */
  price: number;
}

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

/**
 * Printing House Article Interface
 * @author Daniel Sogl
 */
export interface PrintingHouseArticle {
  /** Image heigh */
  heigh: number;
  /** Minimal price */
  minPrice: number;
  /** Image name */
  name: string;
  /** Costomer price */
  price: number;
  /** Image width */
  width: number;
}

/**
 * Print type enum
 * @author Daniel Sogl
 */
export enum PRINTTYPE {
  PICTURE = 'Pictures'
}
