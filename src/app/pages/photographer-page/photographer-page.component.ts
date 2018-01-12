import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { PhotographerProfile } from '../../interfaces/photographer-profile';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

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
          .subscribe(photographer => {
            this.log.d('Photographer UID');
            this.photographer = photographer[0];
            this.events = this.afs
              .getPhotographerEvents(this.photographer.uid)
              .valueChanges();
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
