import { Component, Input, OnInit } from '@angular/core';
import { Summary } from './summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  @Input() summary: Summary;
  constructor() { }

  ngOnInit() {
  }

}
