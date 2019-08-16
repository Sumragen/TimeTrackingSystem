import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ACTIVITY_STATUS, ActivityState } from '../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../shared/store/store';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage {
   constructor(
      private store: Store<STORE_STATE>
   ) {}

   public applyActivityType(target: ACTIVITY_STATUS, type?: string) {
      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            type
         }
      });
   }

   public isInIdle(status: ACTIVITY_STATUS): boolean {
      return status === ACTIVITY_STATUS.IDLE;
   }

   public isInPerform(status: ACTIVITY_STATUS): boolean {
      return status === ACTIVITY_STATUS.PERFORM;
   }
}
