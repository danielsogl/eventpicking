import { EventpickingSub } from '../interfaces/subscription';
import { UserRoles } from '../interfaces/user-roles';
import { Address } from '../interfaces/address';

/**
 * Firebase User
 * @author Daniel Sogl
 */
export class User {
  /** Billing adress */
  billingAdress: Address;
  /** delivery Adress */
  deliveryAdress: Address;
  /** Email */
  email: string;
  /** Event counter */
  eventCounter: number;
  /** Events left */
  eventsLeft: number;
  /** is validated */
  isValidated: boolean;
  /** Lastname */
  lastname: string;
  /** Name */
  name: string;
  /** Photographer URL */
  photographerUrl?: string;
  /** Photo URL */
  photoURL?: string;
  /** Roles */
  roles: UserRoles;
  /** Salutation */
  salutation: string;
  /** Subscription */
  subscription: EventpickingSub;
  /** UID */
  uid: string;

  /**
   * Constructor
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.billingAdress = {
      city: '',
      company: '',
      email: '',
      lastname: '',
      name: '',
      phone: '',
      street: '',
      streetnumber: '',
      zip: ''
    };
    this.deliveryAdress = {
      city: '',
      company: '',
      email: '',
      lastname: '',
      name: '',
      phone: '',
      street: '',
      streetnumber: '',
      zip: ''
    };
    this.email = authData.email;
    this.eventCounter = 0;
    this.eventsLeft = 1;
    this.isValidated = false;
    this.lastname = '';
    this.name = '';
    this.photographerUrl = authData.photographerUrl;
    this.photoURL = authData.photoURL;
    this.roles = { user: true, admin: false, photographer: false };
    this.salutation = '';
    this.subscription = { membership: 'user', status: 'valid' };
    this.uid = authData.uid;
  }
}
