import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Event search page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-event-search-page',
  templateUrl: './event-search-page.component.html',
  styleUrls: ['./event-search-page.component.scss']
})
export class EventSearchPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventSearchPageComponent');

  /**
   * Constructor
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   */
  constructor(private afs: FirebaseFirestoreService) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
