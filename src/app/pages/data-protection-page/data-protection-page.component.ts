import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Data protection page component
 * @author Daniel Kroll
 */
@Component({
  selector: 'app-data-protection-page',
  templateUrl: './data-protection-page.component.html',
  styleUrls: ['./data-protection-page.component.scss']
})
export class DataProtectionPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('DataProtectionPageComponent');

  /**
   * Cosntructor
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
