import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';

import { PrintingHouse } from '../../classes/printing-house';
import { EventPicture } from '../../interfaces/event-picture';

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

  /** Image */
  public image: EventPicture;
  /** Printing house */
  public printingHouse: PrintingHouse;

  constructor() {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

  /**
   * Show modal
   * @param  {EventPicture} image Image
   * @param  {PrintingHouse} printingHouse Printing house
   */
  showModal(image: EventPicture, printingHouse: PrintingHouse) {
    this.log.d('Open picture modal');
    this.image = image;
    this.pictureModal.show();
  }
}
