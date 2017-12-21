import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Event user view component
 * @author Daniel Sogl, Daniel Kroll
 */
@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss']
})
export class EventUserComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventUserComponent');

  @Input() event: Event;
  public images: EventPicture[];
  @Input() user: User;

  constructor(private afs: FirebaseFirestoreService) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    // Load images
    this.afs
      .getEventPictures(this.event.id)
      .valueChanges()
      .subscribe(images => {
        if (images) {
          this.images = images;
          this.log.d('Images', this.images);
        }
      });
  }
}
