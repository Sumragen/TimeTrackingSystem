import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityStatusGuard } from './activity-status.guard';
import { IdleComponent } from './idle/idle.component';
import { PerformComponent } from './perform/perform.component';
import { ActivityPage } from './activity.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityPage,
    children: [
      {
        path: '',
        redirectTo: 'idle',
        pathMatch: 'full'
      },
      {
        path: 'idle',
        component: IdleComponent,
        canActivate: [ActivityStatusGuard]
      },
      {
        path: 'perform',
        component: PerformComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
