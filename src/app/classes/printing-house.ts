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
  /** Street */
  street: string;
  /** Street number */
  streetNumber: string;
  /** ZIP */
  zip: string;
  /** User UID */
  uid: string;
  /** Default printinghouse */
  isDefault: boolean;
  /** Id */
  id: string;

  /**
   * Constructor
   */
  constructor() {
    this.city = 'Ludwigsburg';
    this.email = 'info@druckhaus-goetz.de';
    this.name = 'Druckhaus Götz GmbH';
    this.phone = '07141451450';
    this.street = 'Schwieberdinger Str.';
    this.streetNumber = '111-115';
    this.zip = '71636';
    this.isDefault = false;
    this.uid = '';
  }
}
