import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { ApplicationSharedModuleModule } from '../application-shared-module/application-shared-module.module';
import { Component, ViewChild } from '@angular/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let testHostComponent: TestHostComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent, TestHostComponent],
      imports: [
        ApplicationSharedModuleModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the ngOnChanges when values change', () => {
    const fixtureHost = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixtureHost.componentInstance;
    spyOn(testHostComponent.chartComponent, 'ngOnChanges').and.callThrough();
    testHostComponent.loanAmount = 1000;
    testHostComponent.interestAmount = 100;
    fixtureHost.detectChanges();
    expect(testHostComponent.chartComponent.ngOnChanges).toHaveBeenCalled();
  });
});

@Component({
  template: '<app-chart [loanAmount]="loanAmount" [interestAmount]="interestAmount"></app-chart>'
})
class TestHostComponent {
  @ViewChild(ChartComponent, {static: true}) chartComponent;
  loanAmount: number;
  interestAmount: number;
}
