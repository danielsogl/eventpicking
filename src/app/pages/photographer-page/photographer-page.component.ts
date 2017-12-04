import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { PHOTOGRAPHER } from '../photographer-page/photographer-mock';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { PhotographerProfile } from '../../interfaces/photographer-page';

@Component({
  selector: 'app-photographer-page',
  templateUrl: './photographer-page.component.html',
  styleUrls: ['./photographer-page.component.scss']
})
export class PhotographerPageComponent implements OnInit, OnDestroy {
  private log = Log.create('PhotographerPageComponent');

  private sub: any;

  public photographer: User = PHOTOGRAPHER;

  private photographerUrl: string;

  public photographer: PhotographerProfile;

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
              .getPhotographerProfile(data.uid)
              .valueChanges()
              .subscribe(photographer => {
                this.photographer = photographer;
                this.log.d('Photographer Profile', this.photographer);
              });
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
