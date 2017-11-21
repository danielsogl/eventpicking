import { UserRoles } from '../interfaces/user-roles';

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
  displayName?: string;

  /**
   * user roles
   */
  roles: UserRoles;

  /**
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.uid = authData.uid;
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.displayName = authData.displayName;
    this.roles = { user: true };
  }
}
