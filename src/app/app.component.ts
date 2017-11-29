import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MDBSpinningPreloader } from 'ng-mdb-pro';

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
