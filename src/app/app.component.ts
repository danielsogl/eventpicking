import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MDBSpinningPreloader } from 'ng-mdb-pro';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private log = Log.create('AppComponent');

  constructor(
    private mdbSpinningPreloader: MDBSpinningPreloader,
    translate: TranslateService
  ) {
    // Configure ngx-translate
    translate.setDefaultLang('de');
    translate.use(translate.getBrowserLang());
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.mdbSpinningPreloader.stop();
  }
}
