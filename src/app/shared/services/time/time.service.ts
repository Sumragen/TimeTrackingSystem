import { Injectable } from '@angular/core';
import { ActivityTime } from '../../store/reducers/activity.reducer';

@Injectable()
export class TimeService {
   private loggedTime: number;

   constructor() {
   }

   public performCalculation(): ActivityTime {
      let performedTime: number;
      const now: number = Date.now();
      const lastLoggedTime: number = this.loggedTime;

      this.loggedTime = null;

      performedTime = now - lastLoggedTime;

      return {
         performedTime: performedTime,
         date: now
      };
   }

   public logTime(): void {
      this.loggedTime = Date.now();
   }
}