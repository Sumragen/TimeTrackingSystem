import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';

import { StatisticPage } from './statistic.page';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), ChartsModule],
  declarations: [StatisticPage, ChartComponent]
})
export class StatisticPageModule {}
