import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Features page component
 * @author Daniel Sogl, Jascha Renner
 */
@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('FeaturesPageComponent');

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
