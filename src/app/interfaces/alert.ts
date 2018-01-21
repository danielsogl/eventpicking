import { IndividualConfig } from 'ng-mdb-pro/pro/alerts';

/**
 * Alert Interface
 * @author Daniel Sogl
 */
export interface Alert {
  message?: string;
  options?: IndividualConfig;
  title: string;
}
