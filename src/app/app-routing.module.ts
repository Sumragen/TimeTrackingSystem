import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePageModule } from './home/home.module';
import { StatisticPageModule } from './statistic/statistic.module';

const routes: Routes = [
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: 'home', loadChildren: () => HomePageModule},
   {path: 'statistic', loadChildren: () => StatisticPageModule},
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
   ],
   exports: [RouterModule]
})
export class AppRoutingModule {}
