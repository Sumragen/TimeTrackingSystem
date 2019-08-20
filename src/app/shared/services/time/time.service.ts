import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

   constructor() {
   }

   public rangeBetweenNowAnd(date): number {
      return this.now() - date;
   }

   public now(): number {
      return Date.now();
   }
}