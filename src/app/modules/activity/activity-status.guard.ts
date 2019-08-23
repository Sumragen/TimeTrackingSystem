import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';

import { StoreState } from '../../shared/store/store';
import { ACTIVITY_STATUS } from '../../shared/store/reducers/activity.reducer';
import { ActivityStorageService } from './services/activity-storage.service';

@Injectable()
export class ActivityStatusGuard implements CanActivate {
  constructor(private router: Router, private storageService: ActivityStorageService) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return this.storageService.getSavedState().then((storeState: StoreState) => {
      if (!!storeState && !!storeState.activity) {
        const activityStatus: string = storeState.activity.status;

        if (activityStatus === ACTIVITY_STATUS.PERFORM) {
          // TODO: clarify is it nice way to map activity status to url; this.router.parseUrl(activity.status)
          return this.router.parseUrl('/activity/perform');
        }
      }
      return true;
    });
  }
}
