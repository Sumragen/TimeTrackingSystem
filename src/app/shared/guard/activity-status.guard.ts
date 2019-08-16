import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { STORE_STATE } from '../store/store';
import { ACTIVITY_STATUS } from '../store/reducers/activity.reducer';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
   providedIn: 'root'
})
export class ActivityStatusGuard implements CanActivate {
   constructor(private router: Router,
               private storageService: StorageService) {
   }

   canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      return this.storageService.getSavedState().then((state: STORE_STATE) => {
            if (!!state && !!state.activity) {
               const activityStatus: string = state.activity.status;

               if (activityStatus === ACTIVITY_STATUS.PERFORM) {
                  return this.router.parseUrl('/home/perform'); // TODO: clarify is it nice way to map activity status to url; this.router.parseUrl(activity.status)
               }
            }
            return true;
         })
   }
}