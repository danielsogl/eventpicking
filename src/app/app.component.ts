import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MDBSpinningPreloader } from 'ng-mdb-pro';
import { Log } from 'ng2-logger';

/**
 * Root component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  /** Logger */
  private log = Log.create('AppComponent');

  /**
   * Constructor
   * @param  {MDBSpinningPreloader} mdbSpinningPreloader MDB Spinning Preloader
   * @param  {TranslateService} translate Translate Service
   */
  constructor(
    private mdbSpinningPreloader: MDBSpinningPreloader,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    // translate.use(translate.getBrowserLang());
  }

  /**
   * Initialioze component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.mdbSpinningPreloader.stop();
  }
}
