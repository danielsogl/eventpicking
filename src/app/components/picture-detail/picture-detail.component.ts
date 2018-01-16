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

  public eventUserComponent: EventUserComponent;

  /** Image */
  public image: EventPicture = {
    info: { height: 0, size: 0, type: '', width: 0 },
    name: '',
    preview: '',
    ratings: 0,
    thumbnail: '',
    selected: false,
    id: ''
  };

  public imageIndex: number;

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
  }

  /**
   * Show modal
   * @param  {EventPicture} image Image
   * @param  {PrintingHouse} printingHouse Printing house
   */
  showModal(
    image: EventPicture,
    imageIndex: number,
    eventUserComponent: EventUserComponent,
    priceList: PriceList
  ) {
    this.log.d('Open picture modal');
    this.image = image;
    this.eventUserComponent = eventUserComponent;
    this.imageIndex = imageIndex;
    this.pictureModal.show();
  }

  rateImage(image: EventPicture) {
    this.eventUserComponent.rateImage(image);
  }

  reportImage(image: EventPicture) {
    this.eventUserComponent.reportImage(image);
  }

  loadPreviousImage() {
    this.imageIndex--;
    this.image = this.eventUserComponent.getFollowingImage(this.imageIndex);
  }

  loadNextImage() {
    this.imageIndex++;
    this.eventUserComponent.getFollowingImage(this.imageIndex);
  }
}
