import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs/internal/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';

import { TimeService } from '../../services/time/time.service';
import { ActivityStorage, StorageService } from '../../services/storage/storage.service';
import {
  ACTIVITY_STATE_KEY,
  ActivityAction,
  PayloadAction,
  StoreState,
  TargetAction
} from '../store';
import { Activity, ActivityState } from '../reducers/activity.reducer';
import { ActivityService } from '../../../modules/activity/activity.service';

export enum STORAGE_EFFECT {
  LOG_TIME = 'E_LOG_ACTIVITY_TIME',
  COMPLETE = 'E_ACTIVITY_COMPLETE'
}

@Injectable()
export class StorageEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreState>,
    private storageService: StorageService,
    private timeService: TimeService
  ) {}

  logTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(STORAGE_EFFECT.LOG_TIME),
      map(
        (action: PayloadAction<TargetAction<PayloadAction<Activity>>>): PayloadAction<Activity> => {
          const target: PayloadAction<Activity> = action.payload.target;
          return {
            type: target.type,
            payload: {
              ...target.payload,
              date: this.timeService.now()
            }
          };
        }
      )
    )
  );

  complete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(STORAGE_EFFECT.COMPLETE),
      withLatestFrom(this.store$.select(ACTIVITY_STATE_KEY)),
      exhaustMap(([action, state]: [ActivityAction, ActivityState]) =>
        fromPromise(
          Promise.resolve().then(async () => {
            const time: number = this.timeService.rangeBetweenNowAnd(state.date);

            const activity: Activity = {
              ...state,
              type: state.type,
              performedTime: time
            };

            const storage: ActivityStorage = (await this.storageService.getStorage()) || {};

            const type: string = activity.type;
            delete activity.type;

            if (!storage[type]) {
              storage[type] = {
                color: ActivityService.getRandomRGBAColor(),
                data: []
              };
            }
            storage[type].data.push(activity);

            await this.storageService.setStorage(storage);

            return action.payload.target;
          })
        )
      )
    )
  );
}
