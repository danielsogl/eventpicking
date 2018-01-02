import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {
  private log = Log.create('FeaturesPageComponent');

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
