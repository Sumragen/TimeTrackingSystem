import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ActivityActionsKey, ActivityState } from '../reducers/activity.reducer';
import { switchMap, tap } from 'rxjs/operators';
import { ACTIVITY_STATE_KEY, StoreState } from '../store';
import { Store } from '@ngrx/store';
import { ActivityStorageService } from '../../../modules/activity/services/activity-storage.service';

@Injectable()
export class ActivityEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store$: Store<StoreState>,
    private storageService: ActivityStorageService
  ) {}

  perform$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActionsKey.PERFORM),
        tap(() => this.router.navigate(['/activity/perform']))
      ),
    { dispatch: false }
  );

  complete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActionsKey.COMPLETE),
        tap(() => this.router.navigate(['/activity/idle']))
      ),
    { dispatch: false }
  );

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
