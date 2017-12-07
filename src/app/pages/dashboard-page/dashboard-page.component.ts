import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {
  StripeCheckoutHandler,
  StripeCheckoutLoader
} from 'ng-stripe-checkout';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { PhotographerProfile } from '../../interfaces/photographer-page';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private log = Log.create('DashboardPageComponent');

  public handler: any;
  public user: User;
  public fsEvents: any;
  public eventDocs: AngularFirestoreCollection<Event[]>;
  public events: Observable<Event[]>;
  public sales: any[] = [];
  public optionsSelect: Array<any>;
  public activeEvent: number;
  public eventEdit: Event;
  public newEvent: Event = new Event('');
  public template: TemplateRef<any>;
  public photographerProfileDoc: AngularFirestoreDocument<PhotographerProfile>;
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

  public canCreateEvent: boolean;

  private subPlan: any;

  private stripeCheckoutHandler: StripeCheckoutHandler;

  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  @ViewChild('userTmpl') userTmpl: TemplateRef<any>;
  @ViewChild('photographerTmpl') photographerTmpl: TemplateRef<any>;
  @ViewChild('editEventModal') public editEventModal;
  @ViewChild('adminTmpl') adminTmpl: TemplateRef<any>;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private router: Router,
    private stripeCheckoutLoader: StripeCheckoutLoader
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.stripeCheckoutLoader
      .createHandler({
        key: environment.stripeKey,
        token: token => {
          this.log.d('Payment successful!');
          this.afs.processPayment(token, this.subPlan, this.user.uid);
        }
      })
      .then((handler: StripeCheckoutHandler) => {
        this.stripeCheckoutHandler = handler;
      });

    this.optionsSelect = [
      { value: 'male', label: 'Frau' },
      { value: 'female', label: 'Herr' }
    ];
    this.template = this.loadingTmpl;
    this.auth.user.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.log.d('Loaded user', this.user);
        if (this.user.roles.admin) {
          this.template = this.adminTmpl;
        } else if (this.user.roles.user) {
          this.template = this.userTmpl;
        } else {
          this.template = this.photographerTmpl;

          if (this.user.eventsLeft > 0) {
            this.canCreateEvent = true;
          } else {
            this.canCreateEvent = false;
          }

          this.photographerProfileDoc = this.afs.getPhotographerProfile(
            this.user.uid
          );

          this.photographerProfileDoc.valueChanges().subscribe(profile => {
            if (profile) {
              this.photographerProfile = profile;
              this.log.d('Photographer Profile', profile);
            }
          });

          this.eventDocs = this.afs.getPhotographerEvents(this.user.uid);
          this.events = this.eventDocs.snapshotChanges().map((events: any) => {
            return events.map(event => {
              const data = event.payload.doc.data() as Event;
              const id = event.payload.doc.id;
              return { id, ...data };
            });
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.log.d('Component destroyed');
  }

  createNewEvent() {
    if (this.canCreateEvent) {
      this.newEvent.photographerUid = this.auth.getCurrentFirebaseUser().uid;
      this.newEvent.public = false;
      this.eventDocs
        .add(JSON.parse(JSON.stringify(this.newEvent)))
        .then(event => {
          this.afs
            .getUser(this.user.uid)
            .collection(`events`)
            .doc(event.id)
            .set(JSON.parse(JSON.stringify({ id: event.id })))
            .then(res => {
              this.log.d('Added event to events user collection');
            });
          // this.user.eventsLeft--;
          // this.afs.updateUserData(this.user);
          this.newEvent = new Event('');
        })
        .catch(err => {
          this.log.er('Could not update the user', err);
        });
    } else {
      this.log.d('User can not create another event without upgrading');
    }
  }

  editEvent(event: Event) {
    this.router.navigate(['event', event.id]);
  }

  updateProfile() {
    this.afs
      .updateUserData(this.user)
      .then(() => {
        this.log.d('Updated user');
      })
      .catch(err => {
        this.log.er('Could not update user data', err);
      });
    if (this.template === this.photographerTmpl) {
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

  deleteEvent() {}

  upgradeSubscription(membership: string) {
    if (membership === 'basic') {
      this.subPlan = {
        email: this.user.email,
        name: 'BASIC',
        description: 'Legen Sie bis zu 15 Events an',
        amount: 2500,
        currency: 'eur'
      };
    } else if (membership === 'smart') {
      this.subPlan = {
        email: this.user.email,
        name: 'SMART',
        description: 'Legen Sie bis zu 35 Events an',
        amount: 3500,
        currency: 'eur'
      };
    } else {
      this.subPlan = {
        email: this.user.email,
        name: 'PRO',
        description: 'Legen Sie bis zu 50 Events an',
        amount: 5000,
        currency: 'eur'
      };
    }

    this.stripeCheckoutHandler.open(this.subPlan);
  }

  public onClickCancel() {
    // If the window has been opened, this is how you can close it:
    this.stripeCheckoutHandler.close();
  }
}
