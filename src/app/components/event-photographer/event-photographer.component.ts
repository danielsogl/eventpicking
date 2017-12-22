import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Event photographer view component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-event-photographer',
  templateUrl: './event-photographer.component.html',
  styleUrls: ['./event-photographer.component.scss']
})
export class EventPhotographerComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventPhotographerComponent');
  @Input() event: Event;
  @Input() images: Observable<EventPicture[]>;
  @Input() user: User;

  constructor(private afs: FirebaseFirestoreService) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    // Load images
    this.images = this.afs.getEventPictures(this.event.id).valueChanges();
  }
}
