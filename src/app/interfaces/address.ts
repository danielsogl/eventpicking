/**
 * Adress ionterface
 * @author Daniel Sogl
 */
export interface Address {
  /** City */
  city: string;
  /** Company */
  company?: string;
  /** Email */
  email: string;
  /** Name */
  name?: string;
  /** Lastname */
  lastname?: string;
  /** Phone */
  phone: string;
  /** Street */
  street: string;
  /** Street number */
  streetnumber: string;
  /** ZIP */
  zip: string;
}
