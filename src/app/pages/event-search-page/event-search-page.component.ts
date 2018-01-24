import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
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
  public events: Event[] = [];
  public searchedEvents: Event[] = [];
  /** define which register is preselected */
  public radioModel = 'left';

  /** TemplateRef download */
  @ViewChild('id') id: TemplateRef<any>;
  /** TemplateRef print */
  @ViewChild('name') name: TemplateRef<any>;

  /** Template ref  */
  public templateType: TemplateRef<any>;

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
    this.templateType = this.id;
    this.afs
      .getAllEvents()
      .valueChanges()
      .subscribe(events => {
        if (events) {
          this.events = events;
          this.log.info('Events: ', this.events);
        }
      });
  }

  /** Input key listeners */
  onKey(event: any) {
    // clear searchedEvents
    this.searchedEvents.splice(0);
    // if input value = '' all events would be shown
    if (event.target.value !== '') {
      for (let i = 0; i < this.events.length; i++) {
        // differentiate id and name
        if (this.radioModel === 'left') {
          if (this.events[i].id.startsWith(event.target.value)) {
            if (!this.searchedEvents.includes(this.events[i])) {
              this.searchedEvents.push(this.events[i]);
            }
          }
        }
        if (this.radioModel === 'right') {
          if (this.events[i].name.startsWith(event.target.value)) {
            if (!this.searchedEvents.includes(this.events[i])) {
              this.searchedEvents.push(this.events[i]);
            }
          }
        }
      }
    }
  }
}
