import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './home.page';
import { IdleComponent } from './idle/idle.component';
import { PerformComponent } from './perform/perform.component';
import { HomeRoutingModule } from './home-routing.module';
import { activityReducer } from '../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY } from '../../shared/store/store';
import { StorageEffect } from '../../shared/store/effects/storage.effect';
import { ActivityEffect } from '../../shared/store/effects/activity.effect';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      HomeRoutingModule,
      StoreModule.forFeature(ACTIVITY_STATE_KEY, activityReducer),
      EffectsModule.forFeature([StorageEffect, ActivityEffect])
   ],
   declarations: [
      HomePage,
      IdleComponent,
      PerformComponent
   ]
})
export class HomePageModule {}
