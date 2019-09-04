import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlueprintPageComponent } from './blueprint-page.component';

const routes: Routes = [
  {
    path: '',
    component: BlueprintPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlueprintRoutingModule {}
