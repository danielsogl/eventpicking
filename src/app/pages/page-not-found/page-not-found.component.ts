import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Page not found page component
 * @author Markus Kirschner
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  /** Logger */
  private log = Log.create('PageNotFoundComponent');

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
