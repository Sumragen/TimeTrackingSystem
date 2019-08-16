import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs/internal/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';

import { TimeService } from '../../services/time/time.service';
import { ActivityStorage, StorageService } from '../../services/storage/storage.service';
import { ACTIVITY_STATE_KEY, ActivityAction, PayloadAction, STORE_STATE } from '../store';
import { Activity, ActivityState, ActivityTime } from '../reducers/activity.reducer';
import { TypedAction } from '@ngrx/store/src/models';

export enum STORAGE_EFFECT {
   LOG_TIME = 'E_LOG_ACTIVITY_TIME',
   COMPLETE = 'E_ACTIVITY_COMPLETE'
}

@Injectable()
export class StorageEffect {
   constructor(private actions$: Actions,
               private store$: Store<STORE_STATE>,
               private storageService: StorageService,
               private timeService: TimeService) {
   }

   logTime$ =
      createEffect(() => this.actions$.pipe(
         ofType(STORAGE_EFFECT.LOG_TIME),
         tap(() => this.timeService.logTime),
         map(this.switchActionToTarget)
      ));

   complete$ =
      createEffect(() => this.actions$.pipe(
         ofType(STORAGE_EFFECT.COMPLETE),
         withLatestFrom(this.store$.select(ACTIVITY_STATE_KEY)),
         exhaustMap(([action, state]: [ActivityAction, ActivityState]) => fromPromise(
            Promise.resolve().then(async () => {
               const time: ActivityTime = this.timeService.performCalculation();

               const activity: Activity = {
                  ...time,
                  ...state
               };

               const storage: ActivityStorage = await this.storageService.getStorage() || {};

               const type: string = activity.type;
               delete activity.type;

               if (!storage[type]) {
                  storage[type] = [];
               }
               storage[type].push(activity);

               await this.storageService.setStorage(storage);

               return action;
            })
         )),
         map(this.switchActionToTarget)
      ));

   private switchActionToTarget(action: PayloadAction<any>): any {
      const target = action.payload.target;
      delete action.payload.target;

      return {
         type: target,
         payload: action.payload
      };
   }
}