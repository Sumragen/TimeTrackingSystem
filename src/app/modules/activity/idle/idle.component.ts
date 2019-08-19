import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../../shared/store/store';
import { ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import { ActivityService } from '../../../shared/services/activity/activity.service';
import { Select } from '../../../shared/store/decorators/select';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
   public types: string[] = [];
   @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

   constructor(private activityService: ActivityService,
               private store: Store<STORE_STATE>) { }

   ngOnInit() {
      this.activityService.getCurrentTypes().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types;
      });
   }

   public applyActivityType(type: string) {
      this.store.dispatch({
         type: STORAGE_EFFECT.LOG_TIME,
         payload: {
            target: {
               type: ActivityActionsKey.PERFORM,
               payload: {
                  type
               }
            }
         }
      });
   }
}
