import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { IdleComponent } from './idle/idle.component';
import { PerformComponent } from './perform/perform.component';

const routes: Routes = [
   {
      path: '',
      component: HomePage,
      children: [
         {
            path: '',
            redirectTo: 'idle',
            pathMatch: 'full'
         },
         {
            path: 'idle',
            component: IdleComponent
         },
         {
            path: 'perform',
            component: PerformComponent
         },
      ]
   },
];

@NgModule({
   imports: [
      RouterModule.forChild(routes),
   ],
   exports: [RouterModule]
})
export class HomeRoutingModule {}