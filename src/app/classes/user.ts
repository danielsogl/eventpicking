import { BillingDetails } from '../interfaces/billing-details';
import { Adress } from '../interfaces/adress';
import { UserRoles } from '../interfaces/user-roles';
import { Event } from './event';
import { SocialNetworkLinks } from '../interfaces/social-network-links';

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
  photographerUrl?: string;

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

  events: string[];

  sovialNetworks: SocialNetworkLinks;

  salutation: string;

  name: string;
  lastname: string;

  /**
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.adress = authData.adress;
    this.billingDetails = authData.billingDetails;
    this.email = authData.email;
    this.events = authData.events;
    this.photographerUrl = authData.photographerUrl;
    this.photoURL = authData.photoURL;
    this.roles = { user: true, admin: false, photographer: false };
    this.sovialNetworks = authData.sovialNetworks;
    this.uid = authData.uid;
    this.salutation = authData.salutation;
    this.name = authData.name;
    this.lastname = authData.lastname;
  }
}
