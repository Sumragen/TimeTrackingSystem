import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ActivityActionsKey, ActivityState } from './activity.reducer';
import { ACTIVITY_STATE_KEY, StoreState } from '../../../shared/store/store';
import { ActivityStorageService } from '../services/activity-storage.service';

@Injectable()
export class ActivityEffect {
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
        switchMap(() => this.store$.select(ACTIVITY_STATE_KEY)),
        tap((state: ActivityState) => this.storageService.setSavedState(state))
      ),
    {
      dispatch: false
    }
  );
}
