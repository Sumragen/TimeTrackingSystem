import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  constructor() {}

  public static twoDigitNumber(value: number): string {
    return ('0' + value).slice(-2);
  }

  public rangeBetweenNowAnd(date): number {
    return this.now() - date;
  }

  public now(): number {
    return Date.now();
  }
}
