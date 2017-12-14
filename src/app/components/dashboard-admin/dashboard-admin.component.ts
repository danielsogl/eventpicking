import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../classes/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';

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

  // Modals
  @ViewChild('editUserModal') public editUserModal: ModalDirective;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      uid: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      eventsLeft: ['', Validators.required],
      eventCounter: ['', Validators.required],
      isValidated: ['', Validators.required],
      role: ['', Validators.required],
      subscription: ['', Validators.required]
    });
  }

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

  /**
   * Open edit user modal
   * @param  {User} user User
   */
  editUser(user: User) {
    // this.userForm.setValue({
    //   uid: user.uid,
    //   email: user.email,
    //   name: user.name ? user.name : '',
    //   lastname: user.lastname,
    //   phone: user.phone,
    //   sstreet: user.street,
    //   city: user.city,
    //   zip: user.zip,
    //   eventsLeft: user.eventsLeft,
    //   eventCounter: user.eventCounter,
    //   isValidated: user.isValidated,
    //   roles: user.roles,
    //   subscribe: user.subscription
    // });
    this.editUserModal.show();
  }

  updateUser() {}
}
