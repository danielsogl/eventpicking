/**
 * Download class
 * @author Daniel Sogl
 */
export class DownloadPricelist {
  items: DownloadItem[];

  constructor() {
    this.items = [
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
  }
}

/**
 * Download item interface
 * @author Daniel Sogl
 */
export interface DownloadItem {
  name: string;
  minPrice: number;
  price: number;
}
