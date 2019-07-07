import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Summary } from '../summary/summary';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Installment } from '../installments/installment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit, OnDestroy {
  loanCalculatorForm: FormGroup;
  dataSource: any = [];
  interestRate: number = 25;
  summary: Summary = new Summary();
  submitClick: boolean = false;
  subscriptions = new Subscription();

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.generateView();
    this.subscriptions.add(this.loanCalculatorForm.valueChanges.subscribe(() => this.calculate()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  generateView() {
    this.loanCalculatorForm = this.fb.group(
      {
        loanAmount: new FormControl('', Validators.required),
        loanPeriod: new FormControl('', Validators.required),
        loanReplacementDate: new FormControl(
          {value: new Date(moment().add(1, 'month').startOf('month').format('MM/DD/YYYY')), disabled: true}, Validators.required)
      }
    );
  }

  /**
   * format the ticker label in loan amount slider
   * @param v slider value
   */

  formatRateLabel = (v) => {
    return '£ ' + v;
  };
  /**
   * Filter the date only allow user to select dates from next month.
   * ie: if user try to calculate on 2019-01-01
   *    will be able to select replacement date 2019-02-01 to 2019-02-28
   * @param d Date
   */
  dateFilter = (d: Date) => {
    const minDate = moment().add(1, 'month').startOf('month');
    const maxDate = moment(minDate).endOf('month');
    return (moment(d).isBetween(minDate.subtract(1, 'day'), maxDate));
  };
  /**
   *
   * @param control from controller name
   */
  errorHandling = (control: string) => {
    return this.loanCalculatorForm.controls[control].hasError('required');
  };

  calculate() {
    this.submitClick = true;
    if (this.loanCalculatorForm.invalid) {
      return;
    }
    const installmentList = [];
    let totalInterest = 0;
    const loanAmount = this.loanCalculatorForm.get('loanAmount').value;
    const period = this.loanCalculatorForm.get('loanPeriod').value;
    const loanReplacementDate = this.loanCalculatorForm.get('loanReplacementDate').value;
    const principal = loanAmount / period;
    for (let m = 1; m <= period; m++) {
      // remaining amount to pay
      const remainingAmount = loanAmount - (m) * (principal);
      // calculate the interest
      const interest = (loanAmount - (m - 1) * (principal)) * (this.interestRate / (100 * 12));
      const installment = new Installment();
      installment.id = m;
      installment.installmentAmount = (principal + interest);
      installment.remainingAmount = remainingAmount;
      installment.installmentInterest = interest;
      installment.installmentDate = this.getInstallmentDate(loanReplacementDate, m);
      totalInterest += interest;
      installmentList.push(installment);
    }
    this.dataSource = installmentList;
    this.summary.loanAmount = loanAmount;
    this.summary.totalInterest = +totalInterest.toFixed(2);
    this.summary.totalAmount = +(loanAmount + totalInterest).toFixed(2);
  }

  /**
   *
   * @param selectedDate selectDate for replacement
   * @param installment installment id
   */
  getInstallmentDate(selectedDate, installment): Date {
    let nextInstallmentDate;
    // first replacement date will be selected date
    if (installment === 1) {
      nextInstallmentDate = moment(selectedDate);
    } else {
      // get the End date of selected month
      const endDate = moment(selectedDate).endOf('month').format('DD');
      // if the user select 31st of the month next replacement date should be end of next month
      if (+endDate === 31 && +endDate === selectedDate.getDate()) {
        nextInstallmentDate = moment(selectedDate).add(installment - 1, 'month').endOf('month');
      } else {
        nextInstallmentDate = moment(selectedDate).add((installment - 1), 'month');
      }
    }
    return nextInstallmentDate;
  }
}
