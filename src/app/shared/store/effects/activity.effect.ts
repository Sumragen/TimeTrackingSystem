import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ActivityActionsKey } from '../reducers/activity.reducer';
import { tap } from 'rxjs/operators';

@Injectable()
export class ActivityEffect {
  constructor(private actions$: Actions, private router: Router) {}

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
}
