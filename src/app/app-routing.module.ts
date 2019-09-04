import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ActivityPageModule } from './modules/activity/activity.module';
import { StatisticPageModule } from './modules/statistic/statistic.module';
import { SchedulePageModule } from './modules/schedule/schedule-page.module';

const routes: Routes = [
  { path: '', redirectTo: 'activity', pathMatch: 'full' },
  { path: 'activity', loadChildren: () => ActivityPageModule },
  { path: 'statistic', loadChildren: () => StatisticPageModule },
  { path: 'schedule', loadChildren: () => SchedulePageModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
