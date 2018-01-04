/**
 * Printing house class
 * @author Daniel Sogl
 */
export class PrintingHouse {
  /** City */
  city: string;
  /** Email */
  email: string;
  /** Name */
  name: string;
  /** Phone */
  phone: string;
  /** Sales type */
  salesTypes: any;
  /** Street */
  street: string;
  /** Street number */
  streetnumber: string;
  /** ZIP */
  zip: string;
  /** User UID */
  uid: string;
  /** Default printinghouse */
  isDefault: boolean;

  /**
   * Constructor
   */
  constructor() {
    this.city = '';
    this.email = '';
    this.name = '';
    this.phone = '';
    this.street = '';
    this.streetnumber = '';
    this.zip = '';
    this.isDefault = false;
    this.uid = '';
    this.salesTypes = {
      photo: {
        articles: [
          { price: 0, heigh: 20, width: 30, minPrice: 1, name: '20x30 cm' },
          { price: 0, heigh: 30, width: 40, minPrice: 1.5, name: '30x40 cm' },
          { price: 0, heigh: 30, width: 45, minPrice: 2, name: '30x45 cm' },
          { price: 0, heigh: 40, width: 60, minPrice: 2.5, name: '40x60 cm' },
          { price: 0, heigh: 45, width: 60, minPrice: 3, name: '45x60 cm' },
          { price: 0, heigh: 50, width: 75, minPrice: 3.5, name: '50x75 cm' },
          { price: 0, heigh: 60, width: 80, minPrice: 4, name: '60x80 cm' }
        ]
      },
      download: {
        articles: [{ price: 0, minPrice: 1.5, name: 'Original file' }]
      }
    };
  }
}
