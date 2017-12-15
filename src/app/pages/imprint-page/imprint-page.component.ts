import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Imprint page component
 * @author Jascha Renner
 */
@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss']
})
export class ImprintPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('ImprintPageComponent');

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
