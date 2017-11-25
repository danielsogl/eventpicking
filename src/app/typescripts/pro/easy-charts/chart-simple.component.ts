import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mdb-simple-chart',
  templateUrl: './chart-simple.component.html',
  styles: []
})
export class SimpleChartComponent implements OnInit {
  @Input('percent') percent: any;
  @Input('barColor') barColor: string;
  public options: any = {
    barColor: null,
    trackColor: '#f9f9f9',
    scaleColor: '#dfe0e0',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 3,
    size: 110,
    rotate: 0,
    animate: {
      duration: 1000,
      enabled: true
    }
  };

  constructor() {
  }

  ngOnInit() {
    this.options.barColor = '#' + this.barColor;
  }

}
