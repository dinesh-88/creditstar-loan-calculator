import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SummaryComponent } from './summary/summary.component';
import { InstallmentsComponent } from './installments/installments.component';
import { ApplicationSharedModuleModule } from './application-shared-module/application-shared-module.module';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SummaryComponent,
    InstallmentsComponent,
    CalculatorComponent
  ],
  imports: [
    ApplicationSharedModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
