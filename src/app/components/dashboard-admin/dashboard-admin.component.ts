import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Admin dashboard component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardAdminComponent');

  /** Firebase user */
  public user: User;

  /** User modal form */
  public userForm: FormGroup;
  /** Event modal form  */
  public eventForm: FormGroup;
  /** Printing house modal form */
  public printingHouseForm: FormGroup;

  /** All users from Firestore */
  public users: Observable<User[]>;
  /** All events from Firestore */
  public events: Observable<Event[]>;

  /** Edit user modal */
  @ViewChild('editUserModal') public editUserModal: ModalDirective;
  /** Edit event modal */
  @ViewChild('editEventModal') public editEventModal: ModalDirective;

  /**
   * Constructor
   * @param  {FirebaseAuthService} privateauth Firebase Auth Service
   * @param  {FirebaseFirestoreService} privateafs Firebase Firestore Service
   * @param  {FormBuilder} privateformBuilder Form Builder
   */
  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      city: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      eventCounter: ['', Validators.required],
      eventsLeft: ['', Validators.required],
      isValidated: ['', Validators.required],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      street: ['', Validators.required],
      subscription: ['', Validators.required],
      uid: ['', Validators.required],
      zip: ['', Validators.required]
    });
    this.eventForm = this.formBuilder.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required],
      photographerUid: ['', Validators.required],
      public: [false, Validators.required]
    });
    this.printingHouseForm = this.formBuilder.group({
      city: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', user);
    });

    if (this.auth.getCurrentFirebaseUser()) {
      // Load users from Firestore
      this.users = this.afs.getAllUser().valueChanges();
      // Load events from Firestore
      this.events = this.afs.getAllEvents().valueChanges();
    }
  }

  /**
   * Open edit event modal
   * @param  {Event} event Event
   */
  editEvent(event: Event) {
    this.editEventModal.show();
  }

  /**
   * Update event and hide modal
   */
  updateEvent() {
    this.editEventModal.hide();
  }

  /**
   * Open edit user modal
   * @param  {User} user User
   */
  editUser(user: User) {
    this.editUserModal.show();
  }

  /**
   * Update user and hide modal
   */
  updateUser() {
    this.editUserModal.hide();
  }
}
