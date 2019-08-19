import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { createSelector, select, Store } from '@ngrx/store';

import { ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../../shared/store/store';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import { Select } from '../../../shared/store/decorators/select';

@Component({
   selector: 'app-perform',
   templateUrl: './perform.component.html',
   styleUrls: ['./perform.component.scss'],
})
export class PerformComponent {

   @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

   constructor(private store: Store<STORE_STATE>) { }

   public updateDescription(description: string): void {
      this.store.dispatch({
         type: ActivityActionsKey.SET_DESCRIPTION,
         payload: {
            description
         }
      })
   }

   public completeActivity(): void {
      this.store.dispatch({
         type: STORAGE_EFFECT.COMPLETE,
         payload: {
            target: {
               type: ActivityActionsKey.COMPLETE
            }
         }
      })
   }
}
