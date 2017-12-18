import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  private log = Log.create('EventPageComponent');

  private sub: any;
  private id: string;

  public event: Event;
  public user: User;

  /** Template ref  */
  public template: TemplateRef<any>;

  /** TemplateRef loading */
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  /** TemplateRef event as user */
  @ViewChild('eventUser') eventUser: TemplateRef<any>;
  /** TemplateRef event as photographer */
  @ViewChild('eventPhotographer') eventPhotographer: TemplateRef<any>;
  /** TemplateRef event not found */
  @ViewChild('eventNotFound') eventNotFound: TemplateRef<any>;

  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService,
    private storage: FirebaseStorageService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.template = this.loadingTmpl;
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.log.d('Event ID', this.id);
      if (this.id) {
        this.afs
          .getEvent(this.id)
          .valueChanges()
          .subscribe(event => {
            if (event) {
              this.event = event;
              this.log.d('Loaded event', this.event);
              if (this.auth.getCurrentFirebaseUser()) {
                this.auth.user.subscribe(user => {
                  if (user) {
                    this.user = user;
                    this.log.d('Loaded user', this.user);
                    if (this.event.photographerUid === this.user.uid) {
                      this.template = this.eventPhotographer;
                    }
                  }
                });
              }
            } else {
              this.template = this.eventNotFound;
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
