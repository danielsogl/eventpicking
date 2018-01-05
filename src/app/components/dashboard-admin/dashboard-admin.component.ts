import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { PrintingHouse } from '../../classes/printing-house';
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

  /** Printing House */
  public printingHouse: PrintingHouse;

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
      email: ['', Validators.email],
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
      public: [false, Validators.required],
      ratings: [0, Validators.required]
    });
    this.printingHouseForm = this.formBuilder.group({
      city: ['', Validators.required],
      email: ['', Validators.email],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zip: ['', Validators.required],
      paymentInformation: this.formBuilder.group({
        iban: ['', Validators.required],
        bic: ['', Validators.required],
        accountOwner: ['', Validators.required]
      })
    });
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    if (this.auth.getCurrentFirebaseUser()) {
      this.auth.user.subscribe(user => {
        if (user) {
          this.user = user;
          this.log.d('Loaded user', user);
        }
      });

      // Load users from Firestore
      this.users = this.afs.getAllUser().valueChanges();
      // Load events from Firestore
      this.events = this.afs.getAllEvents().valueChanges();

      this.users.subscribe(user => {
        this.log.d('User', user);
      });
      this.events.subscribe(events => {
        this.log.d('Events', events);
      });
      this.afs
        .getDefautlPrintingHouse()
        .valueChanges()
        .subscribe(house => {
          if (house[0]) {
            this.printingHouse = house[0];
            this.log.d(
              'Loaded printinghouse from firestore',
              this.printingHouse
            );
          } else {
            this.printingHouse = new PrintingHouse();
            this.printingHouse.isDefault = true;
            this.printingHouse.uid = this.auth.getCurrentFirebaseUser().uid;
            this.printingHouse.id = this.afs.getId();
          }
          this.log.d('Created new printing house', this.printingHouse);
        });
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

  /**
   * Update printing house
   */
  updatePrintingHouse() {
    this.afs
      .getDefautlPrintingHouse()
      .doc(this.printingHouse.id)
      .set(JSON.parse(JSON.stringify(this.printingHouse)))
      .then(() => {
        this.log.d('Updated printing house');
      })
      .catch(err => {
        this.log.er('Error saving printing house', err);
      });
  }
}
