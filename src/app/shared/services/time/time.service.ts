import { Injectable } from '@angular/core';

import { ACTIVITY_STATUS } from '../../store/reducers/activity.reducer';

@Injectable()
export class TimeService {
   private loggedTime: number;

   constructor() {
   }

   public performCalculation(actionType: string): any {
      const now: number = Date.now();
      let performedTime: number;
      let lastLoggedTime: number = this.loggedTime;

      if (actionType === ACTIVITY_STATUS.PERFORM) {
         this.loggedTime = null;
      } else {
         this.loggedTime = now;
         return;
      }

      performedTime = now - lastLoggedTime;

      return {
         performedTime: performedTime,
         date: now
      };
   }
}