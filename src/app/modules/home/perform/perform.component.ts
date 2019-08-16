import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../../shared/store/store';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';

@Component({
   selector: 'app-perform',
   templateUrl: './perform.component.html',
   styleUrls: ['./perform.component.scss'],
})
export class PerformComponent implements OnInit {

   constructor(private store: Store<STORE_STATE>) { }

   ngOnInit() {}

   public getState$(): Observable<ActivityState> {
      return this.store.pipe(select(ACTIVITY_STATE_KEY));
   }

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
