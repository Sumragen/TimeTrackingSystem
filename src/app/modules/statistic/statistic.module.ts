import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';

import { StatisticPage } from './statistic.page';
import { ChartComponent } from './components/chart/chart.component';
import { SharedModule } from '../../shared/shared.module';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { StatisticDispatch } from './store/statistic.dispatch';

const routes: Routes = [
  {
    path: '',
    component: StatisticPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartsModule
  ],
  declarations: [StatisticPage, ChartComponent, DateFilterComponent],
  providers: [StatisticDispatch]
})
export class StatisticPageModule {}

