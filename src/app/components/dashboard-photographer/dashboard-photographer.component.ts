import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { PhotographerProfile } from '../../interfaces/photographer-page';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Photographer dashboard component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-dashboard-photographer',
  templateUrl: './dashboard-photographer.component.html',
  styleUrls: ['./dashboard-photographer.component.scss']
})
export class DashboardPhotographerComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardPhotographerComponent');

  /** Firebase user */
  public user: User;

  /** Can create a new event */
  public canCreateEvent: boolean;

  /** New event form */
  public newEventForm: FormGroup;

  /** Edited event */
  public eventEdit: Event;

  /** New event object */
  public newEvent: Event = new Event('');

  /** Events firebase collection */
  public eventDocs: AngularFirestoreCollection<Event[]>;
  /** Photographer events */
  public events: Observable<Event[]>;
  /** Photographer profile document */
  public photographerProfileDoc: AngularFirestoreDocument<PhotographerProfile>;
  /** Photographer profile */
  public photographerProfile: PhotographerProfile = {
    about: '',
    email: '',
    facebook: '',
    instagram: '',
    name: '',
    phone: '',
    tumbler: '',
    twitter: '',
    uid: '',
    website: ''
  };

  /** Create new event modal */
  @ViewChild('createEventModal') public createEventModal;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   * @param  {Router} router Router
   * @param  {FormBuilder} formBuilder FormBuilder
   */
  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.newEventForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(6)],
      location: ['', Validators.required, Validators.minLength(6)],
      date: ['', Validators.required]
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
      if (this.user.eventsLeft > 0) {
        this.canCreateEvent = true;
      } else {
        this.canCreateEvent = false;
      }
    });

    if (this.auth.getCurrentFirebaseUser()) {
      this.photographerProfileDoc = this.afs.getPhotographerProfile(
        this.auth.getCurrentFirebaseUser().uid
      );

      this.photographerProfileDoc.valueChanges().subscribe(profile => {
        if (profile) {
          this.photographerProfile = profile;
          this.log.d('Photographer Profile', profile);
        }
      });

      this.eventDocs = this.afs.getPhotographerEvents(
        this.auth.getCurrentFirebaseUser().uid
      );
      this.events = this.eventDocs.snapshotChanges().map((events: any) => {
        return events.map(event => {
          const data = event.payload.doc.data() as Event;
          const id = event.payload.doc.id;
          return { id, ...data };
        });
      });
    }
  }

  /**
   * Create new event
   */
  createNewEvent() {
    if (this.canCreateEvent) {
      this.newEvent.photographerUid = this.user.uid;
      this.newEvent.public = false;
      this.eventDocs
        .add(JSON.parse(JSON.stringify(this.newEvent)))
        .then(() => {
          this.log.d('Added new event to firestore');
        })
        .catch(err => {
          this.log.er('Could not save event to firestore', err);
        });
    } else {
      this.log.d('User can not create another event without upgrading');
    }
  }

  /**
   * Open event to edit it
   */
  editEvent(event: Event) {
    this.router.navigate(['event', event.id]);
  }

  /**
   * Update user data
   */
  updateProfile() {
    this.afs
      .updateUserData(this.user)
      .then(() => {
        this.log.d('Updated user');
      })
      .catch(err => {
        this.log.er('Could not update user data', err);
      });
    this.photographerProfile.photoURL = this.user.photoURL;
    this.photographerProfile.uid = this.user.uid;
    this.photographerProfile.name = `${this.user.name} ${this.user.lastname}`;
    this.photographerProfileDoc
      .set(this.photographerProfile)
      .then(() => {
        this.log.d('Updated photographer page data');
      })
      .catch(err => {
        this.log.er('Could not update photographer page data', err);
      });
  }
}
