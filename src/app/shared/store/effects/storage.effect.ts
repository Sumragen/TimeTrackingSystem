import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs/internal/operators';

import { TimeService } from '../../services/time/time.service';
import {
  ACTIVITY_STATE_KEY,
  ActivityAction,
  PayloadAction,
  StoreState,
  TargetAction
} from '../store';
import { ActivityState } from '../../../modules/activity/store/activity.reducer';
import { ActivityService } from '../../../modules/activity/services/activity.service';
import { ActivityStorageService } from '../../../modules/activity/services/activity-storage.service';
import { ActivityStorage } from '../../../modules/activity/services/activity-storage.types';
import { Activity } from '../../../modules/activity/models/activity.types';
import { defaultTo, pipe } from 'ramda';

export enum STORAGE_EFFECT {
  LOG_TIME = 'E_LOG_ACTIVITY_TIME',
  COMPLETE = 'E_ACTIVITY_COMPLETE'
}

@Injectable()
export class StorageEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreState>,
    private storageService: ActivityStorageService,
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
        this.storageService.getStorage().pipe(
          map(pipe(defaultTo({}))),
          map((storage: ActivityStorage) => {
            // --------------------------------------------------------------------
            // TODO it's looks like something that could be written in FP style
            const time: number = this.timeService.rangeBetweenNowAnd(state.date);

            const activity: Activity = {
              ...state,
              type: state.type,
              performedTime: time
            };

            const type: string = activity.type;
            delete activity.type;
            // --------------------------------------------------------------------

            if (!storage[type]) {
              storage[type] = {
                color: ActivityService.getRandomHLColor(),
                data: []
              };
            }
            storage[type].data.push(activity);

            return storage;
          }),
          tap((storage: ActivityStorage) => this.storageService.setStorage(storage)),
          map(() => action.payload.target)
        )
      )
    )
  );
}
