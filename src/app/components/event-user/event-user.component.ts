import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { PrintingHouse } from '../../classes/printing-house';
import { Observable } from 'rxjs/Observable';

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

  @Input() public event: Event;
  @Input() public user: User;
  public printingHouse: PrintingHouse;

  public images: Observable<EventPicture[]>;

  constructor(private afs: FirebaseFirestoreService) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    // Load images
    if (this.event) {
      this.images = this.afs.getEventPictures(this.event.id).valueChanges();
      this.images.subscribe(images => {
        this.log.d('Event Images', this.images);
      });

      this.afs
        .getPrintingHouseById(this.event.printinghouse)
        .valueChanges()
        .subscribe(printingHouse => {
          this.printingHouse = printingHouse;
          this.log.d('Loaded printing house', this.printingHouse);
        });
    }
  }
}
