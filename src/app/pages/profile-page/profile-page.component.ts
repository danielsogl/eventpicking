import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

    public user: User;

    public template: TemplateRef<any>;

    @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
    @ViewChild('userTmpl') userTmpl: TemplateRef<any>;
    @ViewChild('photographerTmpl') photographerTmpl: TemplateRef<any>;
    @ViewChild('adminTmpl') adminTmpl: TemplateRef<any>;

    constructor(private router: ActivatedRoute, private auth: FirebaseAuthService) { }

    ngOnInit() {
      this.template = this.loadingTmpl;
      this.auth.user.subscribe((user: any) => {
        if (user) {
          this.user = user;
          console.log(this.user);
          if (this.user.roles.admin) {
            this.template = this.adminTmpl;
          } else if (this.user.roles.user) {
            this.template = this.userTmpl;
          } else {
            this.template = this.photographerTmpl;
          }
        }
      });
    }

    ngOnDestroy() {
    }

  }
