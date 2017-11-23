import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photographer-page',
  templateUrl: './photographer-page.component.html',
  styleUrls: ['./photographer-page.component.scss']
})
export class PhotographerPageComponent implements OnInit, OnDestroy {

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
