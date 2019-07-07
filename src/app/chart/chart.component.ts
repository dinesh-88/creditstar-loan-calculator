import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() loanAmount;
  @Input() interestAmount;
  public options: any = {
    chart: {
      type: 'pie',
      height: 200,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Loan Chart'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Loan',
      colorByPoint: true,
      data: []
    }]
  };

  constructor() {
  }

  ngOnInit() {
    Highcharts.chart('container', this.options);
    Highcharts.setOptions({
      colors: ['#f79231', '#ED561B']
    });
  }

  ngOnChanges(): void {
    this.options.series[0].data = [];
    this.options.series[0].data.push({
      name: 'Loan',
      y: this.loanAmount,
      selected: true
    });
    this.options.series[0].data.push({
      name: 'Interest',
      y: this.interestAmount
    });
    Highcharts.chart('container', this.options);
    Highcharts.setOptions({
      colors: ['#f79231', '#ED561B']
    });
  }
}
