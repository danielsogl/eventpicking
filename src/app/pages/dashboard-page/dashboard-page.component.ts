import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

/**
 * Dashboard page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardPageComponent');

  /** Firebase user */
  public user: User;

  /** Template ref  */
  public template: TemplateRef<any>;

  /** TemplateRef loading */
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  /** TemplateRef dashboard user */
  @ViewChild('dashboardUser') dashboardUser: TemplateRef<any>;
  /** TemplateRef dashboard photographer */
  @ViewChild('dashboardPhotographer') dashboardPhotographer: TemplateRef<any>;
  /** TemplateRef dashboard admin */
  @ViewChild('dashboardAdmin') dashboardAdmin: TemplateRef<any>;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   */
  constructor(private auth: FirebaseAuthService) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.loadingTmpl;
    this.auth.user.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.log.d('Loaded user', this.user);
        if (this.user.roles.admin) {
          this.template = this.dashboardAdmin;
        } else if (this.user.roles.user) {
          this.template = this.dashboardUser;
        } else {
          this.template = this.dashboardPhotographer;
        }
      }
    });
  }
}
