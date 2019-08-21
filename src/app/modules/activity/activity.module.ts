import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { activityReducer } from '../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY } from '../../shared/store/store';
import { StorageEffect } from '../../shared/store/effects/storage.effect';
import { ActivityEffect } from '../../shared/store/effects/activity.effect';
import { TypeInputComponent } from './type-input/type-input.component';

import { ActivityPage } from './activity.page';
import { IdleComponent } from './idle/idle.component';
import { PerformComponent } from './perform/perform.component';
import { ActivityRoutingModule } from './activity-routing.module';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { SecondsToClockFormatPipe } from '../../shared/pipes/time/seconds-to-clock-format.pipe';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ActivityRoutingModule,
      StoreModule.forFeature(ACTIVITY_STATE_KEY, activityReducer),
      EffectsModule.forFeature([StorageEffect, ActivityEffect])
   ],
   declarations: [
      ActivityPage,
      IdleComponent,
      PerformComponent,
      TypeInputComponent,
      StopwatchComponent,
      SecondsToClockFormatPipe
   ]
})
export class ActivityPageModule {}
