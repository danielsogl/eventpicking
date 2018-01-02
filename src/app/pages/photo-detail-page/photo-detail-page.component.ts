import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss']
})
export class PhotoDetailPageComponent implements OnInit, OnDestroy {
  private log = Log.create('PhotoDetailPageComponent');

  private sub: any;
  private id: string;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
