import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { ApplicationSharedModuleModule } from '../application-shared-module/application-shared-module.module';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as moment from 'moment';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        ApplicationSharedModuleModule
      ],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should return true  if given date is in next month', () => {
    const nextMonthDate = moment().add(30, 'day').format('MM/DD/YYYY');
    const dateEnabled = component.dateFilter(new Date(nextMonthDate));
    expect(dateEnabled).toBeTruthy();
  });
  it('Should return false  if given date is out of  next month', () => {
    const nextMonthDate = moment().add(2, 'day').format('MM/DD/YYYY');
    const dateEnabled = component.dateFilter(new Date(nextMonthDate));
    expect(dateEnabled).toBeFalsy();
  });
  it('First installment should be 52.08 when user select 100 as a loan amount and 2 months as loan period', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(2);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment().add(30, 'day').format('MM/DD/YYYY')));
    expect(component.dataSource.length).toEqual(2);
    expect(+component.dataSource[0].installmentAmount.toFixed(2)).toEqual(52.08);
  });

  it('Total Interest  should be 3.12 when user select 100 as a loan amount and 2 months as loan period', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(2);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment().add(30, 'day').format('MM/DD/YYYY')));
    expect(+component.summary.totalInterest.toFixed(2)).toEqual(3.12);
  });

  it('First installment should be 35.42 when user select 100 as a loan amount and 3 months as loan period', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(3);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment().add(30, 'day').format('MM/DD/YYYY')));
    expect(component.dataSource.length).toEqual(3);
    expect(+component.dataSource[0].installmentAmount.toFixed(2)).toEqual(35.42);
  });

  it('Total Interest  should be 4.17 when user select 100 as a loan amount and 2 months as loan period', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(3);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment().add(30, 'day').format('MM/DD/YYYY')));
    expect(+component.summary.totalInterest.toFixed(2)).toEqual(4.17);
  });
  it('First installment date should be selected date', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(2);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment().add(30, 'day').format('MM/DD/YYYY')));
    expect(moment(component.dataSource[0].installmentDate).format('MM/DD/YYYY')).toEqual(moment().add(30, 'day').format('MM/DD/YYYY'));
  });

  it('If user selected the replacement date as 31st of month next replacement date should be end of the next month', () => {
    component.loanCalculatorForm.get('loanAmount').setValue(100);
    component.loanCalculatorForm.get('loanPeriod').setValue(2);
    component.loanCalculatorForm.get('loanReplacementDate').setValue(new Date(moment(new Date(2019, 0, 31)).format('MM/DD/YYYY'))); // 2019-01-31
    expect(moment(component.dataSource[1].installmentDate).format('MM/DD/YYYY')).toEqual(moment(new Date(2019, 1, 28)).format('MM/DD/YYYY')); // 2019-02-28
  });
});
