import { Component, Input } from '@angular/core';

import { Event } from '../../classes/event';

/**
 * Dashboard event card component
 */
@Component({
  selector: 'app-dashboard-event-card',
  templateUrl: './dashboard-event-card.component.html',
  styleUrls: ['./dashboard-event-card.component.scss']
})
export class DashboardEventCardComponent {
  /** Event from dashboard view */
  @Input() event: Event;
}
