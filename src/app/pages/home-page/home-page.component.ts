import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

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

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Initialise component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
