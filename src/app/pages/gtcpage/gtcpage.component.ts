import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * GTC page component
 * @author Daniel Sogl, Daniel Kroll
 */
@Component({
  selector: 'app-gtcpage',
  templateUrl: './gtcpage.component.html',
  styleUrls: ['./gtcpage.component.scss']
})
export class GtcpageComponent implements OnInit {
  /** Logger */
  private log = Log.create('GtcpageComponent');

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
