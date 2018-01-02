import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private log = Log.create('FooterComponent');

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
