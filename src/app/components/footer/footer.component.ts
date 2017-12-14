import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
/**
 * Footer component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  /** Logger */
  private log = Log.create('FooterComponent');

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
