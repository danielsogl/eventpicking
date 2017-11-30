import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  private log = Log.create('EventPageComponent');

  private sub: any;
  private id: string;

  public event: Observable<Event>;
  public user: User;
  public isOwner: boolean;

  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.log.d('Event ID', this.id);
      if (this.id) {
        this.auth.user.subscribe((user: any) => {
          this.user = user;
          this.afs
            .getEvent(this.id)
            .valueChanges()
            .subscribe((event: any) => {
              this.event = event;
              this.log.d('Event data', this.event);
              if (
                this.user.roles.photographer &&
                this.user.events.includes(this.id)
              ) {
                this.isOwner = true;
                this.log.d('Photographer is owner of this event');
              } else {
                this.log.d('Photographer is not the owner of this event');
              }
            });
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
