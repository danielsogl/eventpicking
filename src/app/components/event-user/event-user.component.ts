import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  /** TemplateRef loading */
  @ViewChild('pictureModal') pictureModal: any;

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

    // Load images
    if (this.event) {
      this.afs
        .getEventPictures(this.event.id)
        .valueChanges()
        .map((images: EventPicture[]) => {
          for (let i = 0; i < images.length; i++) {
            images[i].selected = false;
            images[i].amount = 0;
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

  addImagesToCart() {
    const cartItems: ShoppingCartItem[] = [];
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].selected) {
        cartItems.push({
          amount: this.images[i].amount,
          eventname: this.event.name,
          url: this.images[i].thumbnail,
          key: this.images[i].name,
          totalPrice: 10,
          format: {
            height: this.images[i].info.height,
            width: this.images[i].info.width,
            price: 1,
            type: 'Download'
          }
        });
      }
    }
    this.localStorage.setItem('cart-items', cartItems).subscribe(() => {
      console.log('saved');
    });
  }

  reportImage(image: EventPicture) {}
}
