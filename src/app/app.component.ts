import { Component, OnInit } from '@angular/core';

import { MDBSpinningPreloader } from './typescripts/pro/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})

export class AppComponent implements OnInit {


  constructor(private mdbSpinningPreloader: MDBSpinningPreloader) { }

    ngOnInit() {
      this.mdbSpinningPreloader.stop();
    }

}
