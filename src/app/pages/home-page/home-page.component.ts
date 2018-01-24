import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Home page component
 * @author Daniel Sogl, Anna Riesch
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  /** Logger */
  private log = Log.create('HomePageComponent');

  /** Upvoted images */
  public images: Observable<EventPicture[]>;

  /**
   * Constructor
   */
  constructor(private afs: FirebaseFirestoreService) {}

  /**
   * Initialise component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.images = this.afs.getPopularImages().valueChanges();

    this.images.subscribe(images => {
      this.log.d('Popular images', images);
    });
  }
}
