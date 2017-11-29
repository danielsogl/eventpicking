import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

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

  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  @ViewChild('userTmpl') userTmpl: TemplateRef<any>;
  @ViewChild('photographerTmpl') photographerTmpl: TemplateRef<any>;
  @ViewChild('editEventModal') public editEventModal;
  @ViewChild('adminTmpl') adminTmpl: TemplateRef<any>;

  constructor(private auth: FirebaseAuthService, private afs: FirebaseFirestoreService) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: 'male', label: 'Frau' },
      { value: 'female', label: 'Herr' },
    ];
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
          // Load Events
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
  }

  createNewEvent() {
    this.newEvent.photographerUid = this.auth.getCurrentFirebaseUser().uid;
    this.eventDocs.add(JSON.parse(JSON.stringify(this.newEvent))).then(event => {
      console.log('New Event', event);
      this.newEvent = new Event('');
    });
  }

  editEvent(event: Event) {
    console.log(event);
    this.eventEdit = JSON.parse(JSON.stringify(event));
    this.editEventModal.show();
  }

  updateEvent() {
    this.eventDocs.doc(this.eventEdit.id).update(JSON.parse(JSON.stringify(this.eventEdit)));
    this.eventEdit = null;
    this.editEventModal.hide();
  }

  deleteEvent() {
    this.eventDocs.doc(this.eventEdit.id).delete();
    this.eventEdit = null;
    this.editEventModal.hide();
  }

}
