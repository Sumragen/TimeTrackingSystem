import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ACTIVITY_STATE_KEY } from '../../shared/store/store';
import { StorageEffect } from '../../shared/store/effects/storage.effect';
import { SecondsToClockFormatPipe } from '../../shared/pipes/time/seconds-to-clock-format.pipe';
import { SharedModule } from '../../shared/shared.module';

import { PerformComponent } from './components/perform/perform.component';
import { StopwatchComponent } from './components/perform/stopwatch/stopwatch.component';
import { TypeSelectorComponent } from './components/type-selector/type-selector.component';
import { activityReducer } from './store/activity.reducer';
import { ActivityEffect } from './store/activity.effect';
import { ActivityService } from './services/activity.service';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityPage } from './activity.page';
import { ActivityFooterComponent } from './components/activity-footer/activity-footer.component';
import { ActivityDispatch } from './store/activity.dispatch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityRoutingModule,
    StoreModule.forFeature(ACTIVITY_STATE_KEY, activityReducer),
    EffectsModule.forFeature([StorageEffect, ActivityEffect]),
    SharedModule
  ],
  declarations: [
    ActivityPage,
    PerformComponent,
    StopwatchComponent,
    SecondsToClockFormatPipe,
    TypeSelectorComponent,
    ActivityFooterComponent
  ],
  providers: [ActivityService, ActivityDispatch]
})
export class ActivityPageModule {}
