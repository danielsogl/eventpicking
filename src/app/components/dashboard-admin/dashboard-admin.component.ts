import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { PrintingHouse } from '../../interfaces/printing-house';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { PRINTTYPE } from '../../classes/price-list';

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

  /** Printing House */
  public printingHouse: PrintingHouse;

  /** User modal form */
  public userForm: FormGroup;
  /** Event modal form  */
  public eventForm: FormGroup;
  /** Printing house modal form */
  public printingHouseForm: FormGroup;

  /** Event to edit */
  public eventEdit: Event;
  /** User to edit */
  public userEdit: User;

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
      password: ['', Validators.required],
      photographerUid: ['', Validators.required],
      public: [false, Validators.required],
      ratings: [0, Validators.required]
    });
    this.printingHouseForm = this.formBuilder.group({
      address: this.formBuilder.group({
        city: ['', Validators.required],
        email: ['', Validators.email],
        name: ['', Validators.required],
        phone: ['', Validators.required],
        street: ['', Validators.required],
        streetnumber: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      paymentInformation: this.formBuilder.group({
        iban: ['', Validators.required],
        bic: ['', Validators.required],
        accountOwner: ['', Validators.required]
      }),
      id: ['', Validators.required],
      uid: ['', Validators.required],
      isDefault: [true, Validators.required]
    });
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    if (this.auth.getCurrentFirebaseUser()) {
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
            this.printingHouseForm.patchValue(this.printingHouse);
          } else {
            const printingHouse: PrintingHouse = {
              address: {
                city: 'Ludwigsburg',
                email: 'info@druckhaus-goetz.de',
                name: 'Druckhaus Götz GmbH',
                phone: '07141451450',
                street: 'Schwieberdinger Str.',
                streetnumber: '111-115',
                zip: '71636'
              },
              paymentInformation: {
                accountOwner: 'Druckhaus Götz GmbH',
                iban: 'DE27100777770209299700',
                bic: 'NORSDE51XXX'
              },
              printingHouseItems: [
                {
                  name: PRINTTYPE.PICTURE,
                  articles: [
                    {
                      price: 0,
                      heigh: 20,
                      width: 30,
                      minPrice: 1,
                      name: '20x30 cm'
                    },
                    {
                      price: 0,
                      heigh: 30,
                      width: 40,
                      minPrice: 1.5,
                      name: '30x40 cm'
                    },
                    {
                      price: 0,
                      heigh: 30,
                      width: 45,
                      minPrice: 2,
                      name: '30x45 cm'
                    },
                    {
                      price: 0,
                      heigh: 40,
                      width: 60,
                      minPrice: 2.5,
                      name: '40x60 cm'
                    },
                    {
                      price: 0,
                      heigh: 45,
                      width: 60,
                      minPrice: 3,
                      name: '45x60 cm'
                    },
                    {
                      price: 0,
                      heigh: 50,
                      width: 75,
                      minPrice: 3.5,
                      name: '50x75 cm'
                    },
                    {
                      price: 0,
                      heigh: 60,
                      width: 80,
                      minPrice: 4,
                      name: '60x80 cm'
                    }
                  ]
                }
              ],
              isDefault: true,
              uid: this.auth.getCurrentFirebaseUser().uid,
              id: this.afs.getId()
            };
            this.afs
              .createPrintingHouse(printingHouse)
              .then(() => {
                this.log.d('Created default printing house');
              })
              .catch(err => {
                this.log.er('Error creating default printing house', err);
              });
          }
        });
    }
  }

  /**
   * Track ngFor loop
   * @param  {number} index Index
   * @param  {any} obj Object
   * @returns any
   */
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  /**
   * Open edit event modal
   * @param  {Event} event Event
   */
  editEvent(event: Event) {
    this.eventForm.patchValue(event);
    this.editEventModal.show();
  }

  /**
   * Update event and hide modal
   */
  updateEvent() {
    this.afs
      .updatePhotographerEvent(this.eventForm.getRawValue() as Event)
      .then(() => {
        this.log.d('Updated event');
        this.editEventModal.hide();
      })
      .catch(err => {
        this.log.er('Error updating event', err);
        this.editEventModal.hide();
      });
  }

  /**
   * Open edit user modal
   * @param  {User} user User
   */
  editUser(user: User) {
    this.userEdit = user;
    this.editUserModal.show();
  }

  /**
   * Update user and hide modal
   */
  updateUser() {
    this.afs
      .updateUserData(this.userEdit)
      .then(() => {
        this.log.d('Updated user');
        this.editUserModal.hide();
      })
      .catch(err => {
        this.log.er('Error updating user', err);
        this.editUserModal.hide();
      });
  }

  /**
   * Delete user
   */
  deleteUser(user: User) {
    this.afs
      .deleteUser(user.uid)
      .then(() => {
        this.log.d('Deleted user');
        this.editUserModal.hide();
      })
      .catch(err => {
        this.log.er('Error deleting user', err);
        this.editUserModal.hide();
      });
  }

  /**
   * Update printing house
   */
  updatePrintingHouse() {
    if (this.printingHouseForm.valid) {
      const printingHouseItems = this.printingHouse.printingHouseItems;
      this.printingHouse = this.printingHouseForm.getRawValue();
      this.printingHouse.printingHouseItems = printingHouseItems;
      this.afs
        .updatePrintingHouse(this.printingHouse)
        .then(() => {
          this.log.d('Updated printing house');
        })
        .catch(err => {
          this.log.er('Error saving printing house', err);
        });
    }
  }

  /**
   * Sete deleted value
   * @param  {Event} event Event
   */
  deleteEvent(event: Event) {
    this.afs
      .deletePhotographerEvent(event.id)
      .then(() => {
        this.log.d('Event deleted');
      })
      .catch(err => {
        this.log.er('Error deliting event', err);
      });
  }
}
