import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Photographer search page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-photographer-search-page',
  templateUrl: './photographer-search-page.component.html',
  styleUrls: ['./photographer-search-page.component.scss']
})
export class PhotographerSearchPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('PhotographerSearchPageComponent');

  constructor() {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
