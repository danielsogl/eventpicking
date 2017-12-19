import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { PhotographerProfile } from '../../interfaces/photographer-page';
import { Observable } from 'rxjs/Observable';

/**
 * Photographer page component
 * @author Daniel Sogl, Tim Kriesler
 */
@Component({
  selector: 'app-photographer-page',
  templateUrl: './photographer-page.component.html',
  styleUrls: ['./photographer-page.component.scss']
})
export class PhotographerPageComponent implements OnInit, OnDestroy {
  private log = Log.create('PhotographerPageComponent');

  private sub: any;
  private photographerUrl: string;
  public photographer: PhotographerProfile;
  public events: Observable<Event[]>;

  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.photographerUrl = params['photographerUrl'];
      this.log.d('Photographer Url', this.photographerUrl);
      if (this.photographerUrl) {
        this.afs
          .getPhotographerByUrl(this.photographerUrl)
          .valueChanges()
          .subscribe(data => {
            this.log.d('Photographer UID', data.uid);
            this.afs
              .getPhotographerProfile(data.uid)
              .valueChanges()
              .subscribe(photographer => {
                this.photographer = photographer;
                this.log.d('Photographer Profile', this.photographer);
              });
            const eventDocs = this.afs.getPhotographerEvents(data.uid);
            this.events = eventDocs.snapshotChanges().map((events: any) => {
              return events.map(event => {
                const tmp = event.payload.doc.data() as Event;
                const id = event.payload.doc.id;
                return { id, ...tmp };
              });
            });
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
