import {
  Component,
  Input,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { PrintingHouse } from '../../classes/printing-house';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
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

  /** Event Object */
  @Input() public event: Event;
  /** User Object */
  @Input() public user: User;

  /** TemplateRef pictureModal */
  @ViewChild('pictureModal') pictureModal: any;
  /** TemplateRef imgBigOverview */
  @ViewChild('imgBigOverview') imgBigOverview: TemplateRef<any>;
  /** TemplateRef imgSmalOverview */
  @ViewChild('imgSmalOverview') imgSmalOverview: TemplateRef<any>;
  /** TemplateRef imgBigOverview */
  @ViewChild('imgBigMarked') imgBigMarked: TemplateRef<any>;
  /** TemplateRef imgSmalOverview */
  @ViewChild('imgSmalMarked') imgSmalMarked: TemplateRef<any>;

  /** Template ref  */
  public templateOverview: TemplateRef<any>;
  /** Template ref */
  public templateMarked: TemplateRef<any>;

  /** Printing house object */
  public printingHouse: PrintingHouse;
  /** Event images array */
  public images: EventPicture[];

  /**
   * Constructor
   * @param  {FirebaseFirestoreService} afs Angular Firestore Service
   * @param  {AsyncLocalStorage} localStorage Local Storage
   */
  constructor(
    private afs: FirebaseFirestoreService,
    private localStorage: AsyncLocalStorage
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    this.templateOverview = this.imgBigOverview;
    this.templateMarked = this.imgBigMarked;

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

  /**
   * Select all images
   */
  selectAllImages() {
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].selected = true;
    }
  }

  reportImage(image: EventPicture) {}
}
