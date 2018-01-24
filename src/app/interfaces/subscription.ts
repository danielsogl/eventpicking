/**
 * User Subscription
 * @author Daniel Sogl
 */
export interface EventpickingSub {
  /** Membership */
  membership: string;
  /** Preimium */
  premium: boolean;
  /** Status */
  status: string;
  /** Sub ID */
  subId?: string;
  /** Token */
  token?: string;
}
