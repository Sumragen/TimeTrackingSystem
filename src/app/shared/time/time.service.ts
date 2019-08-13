import { Injectable } from '@angular/core';

import { STOP } from '../store/reducers';

@Injectable()
export class TimeService {
   private loggedTime: number;

   constructor() {
   }

   public performCalculation(actionType: string): any {
      const now: number = Date.now();
      let performedTime: number;
      let lastLoggedTime: number = this.loggedTime;

      if (actionType === STOP) {
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