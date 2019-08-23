import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cond, pipe, propEq, T } from 'ramda';

import { ACTIVITY_STATUS, ActivityState } from '../../shared/store/reducers/activity.reducer';

import { ActivityStorageService } from './services/activity-storage.service';

@Injectable()
export class ActivityStatusGuard implements CanActivate {
  constructor(private router: Router, private storageService: ActivityStorageService) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.storageService
      .getSavedState()
      .pipe(
        map(
          pipe(
            cond<ActivityState, UrlTree | boolean>([
              [
                propEq('status', ACTIVITY_STATUS.PERFORM),
                () => this.router.parseUrl('/activity/perform')
              ],
              [T, () => true]
            ])
          )
        )
      );
  }
}
