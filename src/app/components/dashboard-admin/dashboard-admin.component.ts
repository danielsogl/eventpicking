import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../classes/event';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  private log = Log.create('DashboardAdminComponent');

  public user: User;

  public userForm: FormGroup;
  public eventForm: FormGroup;
  public printingHouseForm: FormGroup;

  public users: Observable<User[]>;
  public events: Observable<Event[]>;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', user);
    });

    // Load users from Firestore
    this.users = this.afs.getAllUser().valueChanges();
    // Load events from Firestore
    this.events = this.afs.getAllEvents().valueChanges();
  }
}
