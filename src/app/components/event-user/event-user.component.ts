import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss']
})
export class EventUserComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventUserComponent');
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
