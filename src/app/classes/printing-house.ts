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

  constructor(data?: any) {
    this.city = '';
    this.email = '';
    this.name = '';
    this.phone = '';
    this.street = '';
    this.streetnumber = '';
    this.zip = '';
    this.salesTypes = [];
  }
}
