import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';



@NgModule({
  declarations: [
     ScheduleComponent
  ],
  imports: [
    CommonModule,
     ScheduleRoutingModule
  ]
})
export class SchedulePageModule { }
