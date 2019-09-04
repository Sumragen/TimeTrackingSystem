import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePageComponent } from './schedule-page.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SchedulePageComponent],
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ScheduleRoutingModule]
})
export class SchedulePageModule {}
