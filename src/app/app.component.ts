import { Component, OnInit } from '@angular/core';

import { MDBSpinningPreloader } from './typescripts/pro/index';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})

export class AppComponent implements OnInit {


  constructor(private mdbSpinningPreloader: MDBSpinningPreloader, translate: TranslateService) {
    // Configure ngx-translate
    translate.setDefaultLang('de');
    translate.use(translate.getBrowserLang());
  }

    ngOnInit() {
      this.mdbSpinningPreloader.stop();
    }

}
