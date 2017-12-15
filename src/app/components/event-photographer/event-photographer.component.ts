import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-event-photographer',
  templateUrl: './event-photographer.component.html',
  styleUrls: ['./event-photographer.component.scss']
})
export class EventPhotographerComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventPhotographerComponent');
  @Input() event: Event;
  @Input() user: User;

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);
  }
}
