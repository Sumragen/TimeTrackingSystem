import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlueprintPageComponent } from './blueprint-page.component';
import { BlueprintRoutingModule } from './blueprint-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [BlueprintPageComponent, ScheduleComponent],
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, BlueprintRoutingModule]
})
export class BlueprintPageModule {}
