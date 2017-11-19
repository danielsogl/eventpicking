/**
 * User roles interface
 */
export interface Roles {
  /**
   * user role
   */
  user?: boolean;
  /**
   * admin role
   */
  admin?: boolean;
  /**
   * photographer role
   */
  photographer?: boolean;
}

/**
 * Application User
 */
export class User {
  /**
   * email
   */
  email: string;
  /**
   * avatar url
   */
  photoURL: string;
  /**
   * user roles
   */
  roles: Roles;

  /**
   * @param  {any} authData firebase user
   */
  constructor(authData: any) {
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = { user: true };
  }
}
