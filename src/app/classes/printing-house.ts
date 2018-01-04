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
          { price: 0, width: 100, heigh: 200, minPrice: 1, name: '100x200' },
          { price: 0, width: 200, heigh: 300, minPrice: 2, name: '200x300' }
        ]
      },
      download: { articles: [{ price: 0, minPrice: 1, name: 'Original file' }] }
    };
  }
}
