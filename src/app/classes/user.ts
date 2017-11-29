import { BillingDetails } from '../interfaces/billing-details';
import { Adress } from '../interfaces/adress';
import { UserRoles } from '../interfaces/user-roles';
import { Event } from './event';

/**
 * Application User
 */
export class User {
  /**
   * uid
   */
  uid: string;
  /**
   * email
   */
  email: string;
  /**
   * avatar url
   */
  photoURL?: string;

  /**
   * display name
   */
  shopurl?: string;

  /**
   * user roles
   */
  roles: UserRoles;

  /**
   * Adress
   */
  adress: Adress;

  /**
   * Billing details
   */
  billingDetails: BillingDetails;

  events: Event[];

  /**
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.uid = authData.uid;
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.shopurl = authData.shopurl;
    this.roles = { user: true, admin: false, photographer: false };
    this.adress = authData.adress;
    this.billingDetails = authData.billingDetails;
    this.events = authData.events;
  }
}
