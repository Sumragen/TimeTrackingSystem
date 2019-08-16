import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ACTIVITY_STATE_KEY, STORE_STATE } from '../store/store';
import { ACTIVITY_STATUS, ActivityState } from '../store/reducers/activity.reducer';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ActivityStatusGuard implements CanActivate {
   constructor(private store: Store<STORE_STATE>,
               private router: Router) {
   }

   canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.store.select(ACTIVITY_STATE_KEY).pipe(
         map((activity: ActivityState) => {
            if (!!activity) {
               const activityStatus: string = activity.status;

               if (activityStatus === ACTIVITY_STATUS.PERFORM) {
                  return this.router.parseUrl('/home/perform'); // TODO: clarify is it nice way to map activity status to url; this.router.parseUrl(activity.status)
               }
            }
            return true;
         })
      );
   }
}