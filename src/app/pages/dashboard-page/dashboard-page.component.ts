import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  private log = Log.create('DashboardPageComponent');

  public user: User;

  public template: TemplateRef<any>;
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  @ViewChild('dashboardUser') dashboardUser: TemplateRef<any>;
  @ViewChild('dashboardPhotographer') dashboardPhotographer: TemplateRef<any>;
  @ViewChild('dashboardAdmin') dashboardAdmin: TemplateRef<any>;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService
  ) {}

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
