import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.scss']
})
export class PictureDetailComponent implements OnInit {
  /** Logger */
  private log = Log.create('PictureDetailComponent');

  constructor() {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
