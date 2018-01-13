import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { PrintingHouse } from '../../classes/printing-house';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Event user view component
 * @author Daniel Sogl, Markus Kirschner
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

  /** TemplateRef loading */
  @ViewChild('pictureModal') pictureModal: any;

  public printingHouse: PrintingHouse;
  public images: EventPicture[];

  constructor(private afs: FirebaseFirestoreService) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    // Load images
    if (this.event) {
      this.afs
        .getEventPictures(this.event.id)
        .valueChanges()
        .map((images: EventPicture[]) => {
          for (let i = 0; i < images.length; i++) {
            images[i].selected = false;
          }
          return images;
        })
        .subscribe(images => {
          this.images = images;
          this.log.d('Event images', this.images);
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

  /**
   * Open image detail modal
   * @param  {EventPicture} image Image to open
   */
  openImageModal(image: EventPicture) {
    this.pictureModal.showModal(image, this.printingHouse);
  }

  reportImage(image: EventPicture) {}
}
