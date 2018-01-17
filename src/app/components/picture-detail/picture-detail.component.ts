import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';

import { PrintingHouse } from '../../interfaces/printing-house';
import { EventPicture } from '../../interfaces/event-picture';
import { EventUserComponent } from '../event-user/event-user.component';
import { PriceList } from '../../classes/price-list';
import { PrintingHouseArticle } from '../../interfaces/printing-house-article';
import { PRINTTYPE } from '../../enums/print-type';

/**
 * Picture detail modal component
 * @author Daniel Sogl, Tim Kriessler
 */
@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.scss']
})
export class PictureDetailComponent implements OnInit {
  /** Logger */
  private log = Log.create('PictureDetailComponent');

  /** Create new event modal */
  @ViewChild('pictureModal') public pictureModal: ModalDirective;
  /** TemplateRef download */
  @ViewChild('download') download: TemplateRef<any>;
  /** TemplateRef print */
  @ViewChild('print') print: TemplateRef<any>;

  /** Template ref  */
  public templateType: TemplateRef<any>;

  /** Parent Component */
  public eventUserComponent: EventUserComponent;

  /** Image */
  public image: EventPicture = {
    event: '',
    info: { height: 0, size: 0, type: '', width: 0 },
    name: '',
    preview: '',
    ratings: 0,
    thumbnail: '',
    id: '',
    selected: false
  };

  /** index of images array */
  public imageIndex: number;
  /** length of images array */
  public imagesLength: number;
  /** previous image flag */
  public previousFlag: boolean;
  /** next image flag */
  public nextFlag: boolean;

  /** Printing house */
  public printingHouse: PrintingHouse;
  public images: EventPicture[];
  public priceList: PriceList;
  public printPicturePriceList: PrintingHouseArticle[];
  public price: number;
  public format: string;
  public radioModel = 'Left';

  constructor() {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.templateType = this.download;
    this.imagesLength = 0;
    this.previousFlag = false;
    this.nextFlag = false;
  }

  /**
   * Show modal
   * @param  {EventPicture} image Image
   */
  showModal(
    image: EventPicture,
    imageIndex: number,
    imagesLength: number,
    eventUserComponent: EventUserComponent,
    priceList: PriceList
  ) {
    this.log.d('Open picture modal');
    this.image = image;
    this.imageIndex = imageIndex;
    this.imagesLength = imagesLength;
    this.eventUserComponent = eventUserComponent;
    this.priceList = priceList;
    this.previousFlag = false;
    this.nextFlag = false;

    this.createPrintPicturePriceList();

    /** deactivate previous button if selected first picture */
    if (this.imageIndex === 0) {
      this.previousFlag = true;
    }
    /** deactivate next button if selected last picture */
    if (this.imageIndex + 1 === this.imagesLength) {
      this.nextFlag = true;
    }

    this.pictureModal.show();
  }

  rateImage(image: EventPicture) {
    this.eventUserComponent.rateImage(image);
  }

  reportImage(image: EventPicture) {
    this.eventUserComponent.reportImage(image);
  }

  /** load previous image of event-images array for modal-gallery */
  loadPreviousImage() {
    this.nextFlag = false;
    if (this.imageIndex > 0) {
      this.imageIndex--;
      this.image = this.eventUserComponent.getFollowingImage(this.imageIndex);
    }
    // hide previous button if last picture is reached
    if (this.imageIndex === 0) {
      this.previousFlag = true;
    }
  }

  /** load next image of event-images array for modal-gallery */
  loadNextImage() {
    this.previousFlag = false;

    // hide next button if last picture is reached
    if (
      this.eventUserComponent.getFollowingImage(this.imageIndex + 2) ===
      undefined
    ) {
      this.nextFlag = true;
    }
    this.imageIndex++;
    this.image = this.eventUserComponent.getFollowingImage(this.imageIndex);
  }

  createPrintPicturePriceList() {
    // create array to save print-picture pricelist
    for (let i = 0; i < this.priceList.printingHouseItems.length; i++) {
      if (this.priceList.printingHouseItems[i].name === PRINTTYPE.PICTURE) {
        this.printPicturePriceList = this.priceList.printingHouseItems[
          i
        ].articles;
      }
    }
  }

  /** radio button Listener to change price */
  changeFormat(type: string, formatName: string) {
    if (type === 'print') {
      for (let i = 0; i < this.printPicturePriceList.length; i++) {
        if (formatName === this.printPicturePriceList[i].name) {
          this.format = this.printPicturePriceList[i].name;
          this.price = this.printPicturePriceList[i].price;
        }
      }
    }
    if (type === 'download') {
      for (let i = 0; i < this.priceList.downloadItems.length; i++) {
        if (formatName === this.priceList.downloadItems[i].name) {
          this.format = this.printPicturePriceList[i].name;
          this.price = this.priceList.downloadItems[i].price;
        }
      }
    }
  }

  addToShoppingCart() {}
}
