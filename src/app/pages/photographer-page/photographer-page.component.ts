import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { PriceList } from '../../classes/price-list';
import { PrintingHouseArticle } from '../../interfaces/printing-house-article';
import { PRINTTYPE } from '../../enums/print-type';
import { Event } from '../../classes/event';
import { PhotographerProfile } from '../../interfaces/photographer-profile';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Photographer page component
 * @author Daniel Sogl, Tim Kriesler
 */
@Component({
  selector: 'app-photographer-page',
  templateUrl: './photographer-page.component.html',
  styleUrls: ['./photographer-page.component.scss']
})
export class PhotographerPageComponent implements OnInit, OnDestroy {
  /** Logger */
  private log = Log.create('PhotographerPageComponent');

  /** Router sub */
  private sub: any;
  /** Photograpehr url */
  private photographerUrl: string;
  /** Photographer */
  public photographer: PhotographerProfile;
  /** Events */
  public events: Observable<Event[]>;
  /** Printing house object */
  public priceList: PriceList;
  /** define certain price list for simplicity */
  public printPicturePriceList: PrintingHouseArticle[];

  /** Standard photographer */
  @ViewChild('standard') dashboardAdmin: TemplateRef<any>;

  /**
   * Constructor
   * @param  {ActivatedRoute} router Activated Route
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   */
  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.photographerUrl = params['photographerUrl'];
      this.log.d('Photographer Url', this.photographerUrl);
      if (this.photographerUrl) {
        this.afs
          .getPhotographerByUrl(this.photographerUrl)
          .valueChanges()
          .subscribe(photographer => {
            if (photographer) {
              this.photographer = photographer[0];
              this.events = this.afs
                .getPhotographerEvents(this.photographer.uid)
                .valueChanges();

              this.afs
                .getPriceList(this.photographer.uid)
                .valueChanges()
                .subscribe(priceList => {
                  this.priceList = priceList;
                  this.log.d('Loaded priceList', this.priceList);
                  this.createPrintPicturePriceList();
                });
            }
          });
      }
    });
  }

  /**
   *  create array to save print-picture pricelist
   */
  createPrintPicturePriceList() {
    for (let i = 0; i < this.priceList.printingHouseItems.length; i++) {
      if (this.priceList.printingHouseItems[i].name === PRINTTYPE.PICTURE) {
        this.printPicturePriceList = this.priceList.printingHouseItems[
          i
        ].articles;
      }
    }
  }

  /**
   * Unload component
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
