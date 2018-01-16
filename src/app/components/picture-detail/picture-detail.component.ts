import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';

import { PrintingHouse } from '../../interfaces/printing-house';
import { EventPicture } from '../../interfaces/event-picture';
import { EventUserComponent } from '../event-user/event-user.component';
import { PriceList } from '../../classes/price-list';

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
  public radioModel = 'Left';
  public images: EventPicture[];
  public priceList: PriceList;

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
   * @param  {PrintingHouse} printingHouse Printing house
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

  loadPreviousImage() {
    this.nextFlag = false;
    if (this.imageIndex > 0) {
      this.imageIndex--;
      this.image = this.eventUserComponent.getFollowingImage(this.imageIndex);
    }
    if (this.imageIndex === 0) {
      this.previousFlag = true;
    }
  }

  loadNextImage() {
    this.previousFlag = false;
    if (
      this.eventUserComponent.getFollowingImage(this.imageIndex + 2) ===
      undefined
    ) {
      this.nextFlag = true;
    }
    this.imageIndex++;
    this.image = this.eventUserComponent.getFollowingImage(this.imageIndex);
  }
}
