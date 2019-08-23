import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { iif, Observable, of, throwError } from 'rxjs';
import { catchError, pluck, switchMap } from 'rxjs/operators';

import { ACTIVITY_STATUS } from '../../shared/store/reducers/activity.reducer';

import { ActivityStorageService } from './services/activity-storage.service';

@Injectable()
export class ActivityStatusGuard implements CanActivate {
  constructor(private router: Router, private storageService: ActivityStorageService) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.storageService.getSavedState().pipe(
      throwOnEmpty(),
      pluck('activity'),
      throwOnEmpty(),
      pluck('status'),
      switchMap((activityStatus: string) =>
        iif(
          () => activityStatus === ACTIVITY_STATUS.PERFORM,
          of(this.router.parseUrl('/activity/perform')),
          throwError(false)
        )
      ),
      catchError((err: boolean) => of(!err))
    );
  }
}

export const throwOnEmpty = <T>() =>
  switchMap((value: T) => iif(() => !!value, of(value), throwError(false)));
