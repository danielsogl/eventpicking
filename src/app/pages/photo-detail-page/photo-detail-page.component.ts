import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss']
})
export class PhotoDetailPageComponent implements OnInit, OnDestroy {

    private sub: any;
    private id: string;

    constructor(private router: ActivatedRoute) { }

    ngOnInit() {
      this.sub = this.router.params.subscribe(params => {
        this.id = params['id'];
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

  }
