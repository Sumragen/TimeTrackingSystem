import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ACTIVITY_STATE_KEY, StoreState } from '../../../shared/store/store';
import { Select } from '../../../shared/store/decorators/select';

import { ActivityStorageService } from '../services/activity-storage.service';
import { ActivityActionsKey, ActivityState } from './activity.reducer';

@Injectable()
export class ActivityEffect {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(
    private actions$: Actions,
    private router: Router,
    private store$: Store<StoreState>,
    private storageService: ActivityStorageService
  ) {}

  save$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ActivityActionsKey.SET_DESCRIPTION,
          ActivityActionsKey.SET_TYPE,
          ActivityActionsKey.PERFORM,
          ActivityActionsKey.COMPLETE
        ),
        switchMap(() => this.state$),
        tap((state: ActivityState) => this.storageService.setSavedState(state))
      ),
    {
      dispatch: false
    }
  );
}
