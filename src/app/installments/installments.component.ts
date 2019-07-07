import { Component, Input } from '@angular/core';
import { Installment } from './installment';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html'
})
export class InstallmentsComponent {
  @Input() dataSource: Installment[];
  displayedColumns: string[] = ['id', 'installmentInterest', 'installmentAmount', 'remainingAmount', 'installmentDate'];
}
