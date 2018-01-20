import { Injectable } from '@angular/core';
import { ToastService } from 'ng-mdb-pro/pro/alerts';

import { Alert } from '../../interfaces/alert';

/**
 * Alert Service
 * @author Daniel Sogl
 */
@Injectable()
export class AlertService {
  /**
   * Constructor
   * @param  {ToastService} toast Toas Service
   */
  constructor(private toast: ToastService) {}

  /**
   * Show success
   * @param  {Alert} alert
   */
  showSuccess(alert: Alert) {
    this.toast.success(alert.title, alert.message, alert.options);
  }

  /**
   * Show error
   * @param  {Alert} alert
   */
  showError(alert: Alert) {
    this.toast.error(alert.title, alert.message, alert.options);
  }

  /**
   * Show info
   * @param  {Alert} alert
   */
  showInfo(alert: Alert) {
    this.toast.info(alert.title, alert.message, alert.options);
  }

  /**
   * Show warning
   * @param  {Alert} alert
   */
  showWarning(alert: Alert) {
    this.toast.warning(alert.title, alert.message, alert.options);
  }
}
