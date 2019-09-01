import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/internal/operators';
import { defaultTo, pipe } from 'ramda';

import { ActivityState } from '../../../modules/activity/store/activity.reducer';
import { ActivityService } from '../../../modules/activity/services/activity.service';
import { ActivityStorageService } from '../../../modules/activity/services/activity-storage.service';
import { ActivityStorage } from '../../../modules/activity/services/activity-storage.types';

import { Activity } from '../../../modules/activity/models/activity.types';
import { TimeService } from '../../services/time/time.service';
import {
  ACTIVITY_STATE_KEY,
  ActivityAction,
  PayloadAction,
  StoreState,
  TargetAction
} from '../store';
import { ActionBuilder } from '../action-builder';
import { combineLatest, Observable } from 'rxjs';
import { ApplyActivityAction } from '../../../modules/activity/models/activity-action.types';
import { HSLColor } from '../../models/colors.models';

export enum STORAGE_EFFECT {
  LOG_TIME = 'E_LOG_ACTIVITY_TIME',
  COMPLETE = 'E_ACTIVITY_COMPLETE',
  UPDATE_KEY = 'E_UPDATE_KEY'
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
        (action: ApplyActivityAction): PayloadAction<Activity> => {
          const target: PayloadAction<Activity> = action.payload.target;
          return ActionBuilder.payload(target.type, {
            ...target.payload,
            date: this.timeService.now()
          });
        }
      )
    )
  );

  updateKey$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(STORAGE_EFFECT.UPDATE_KEY),
        switchMap((action: PayloadAction<{ color: HSLColor; type: string }>) => {
          return this.storageService.getStorage().pipe(
            map((storage: ActivityStorage) => ({
              ...storage,
              [action.payload.type]: {
                ...storage[action.payload.type],
                color: action.payload.color
              }
            }))
          );
        }),
        tap((storage: ActivityStorage) => this.storageService.setStorage(storage))
      ),
    { dispatch: false }
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

            const activity: Required<Activity> = {
              type: state.type,
              description: state.description,
              date: state.date,
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
