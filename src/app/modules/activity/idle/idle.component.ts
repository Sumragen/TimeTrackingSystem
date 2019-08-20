import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ACTIVITY_STATE_KEY, PayloadAction, TargetAction } from '../../../shared/store/store';
import { Activity, ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import { Select } from '../../../shared/store/decorators/select';
import { Dispatch } from '../../../shared/store/decorators/dispatch';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent {

   @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

   constructor() { }

   @Dispatch()
   public applyActivityType(type: string): PayloadAction<TargetAction<PayloadAction<Activity>>> {
      return {
         type: STORAGE_EFFECT.LOG_TIME,
         payload: {
            target: {
               type: ActivityActionsKey.PERFORM,
               payload: {
                  type
               }
            }
         }
      }
   }
}
