import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-photographer-page',
  templateUrl: './photographer-page.component.html',
  styleUrls: ['./photographer-page.component.scss']
})
export class PhotographerPageComponent implements OnInit, OnDestroy {
  private log = Log.create('PhotographerPageComponent');

  private sub: any;
  private photographerUrl: string;

  public events: Event[];

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
              .getPhotographerEvents(data.uid)
              .valueChanges()
              .subscribe((events: any) => {
                this.events = events;
                this.log.d('Photographer Events', this.events);
              });
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
