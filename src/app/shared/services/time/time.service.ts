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

  public static millisecondsToUFFormat(time: number): string {
    const inSeconds: number = Math.floor(time / 1000);
    const inMinutes: number = Math.floor(inSeconds / 60);
    const inHours: number = Math.floor(inMinutes / 60);

    const hours = inHours;
    const minutes = inMinutes - inHours * 60;
    const seconds = inSeconds - minutes * 60;

    let label = '';

    if (hours > 0) {
      label += `${hours} hour${hours > 1 ? 's' : ''} `;
    }

    if (hours > 0 || minutes > 0) {
      const mLabel = !!label ? TimeService.twoDigitNumber(minutes) : minutes;
      label += `${mLabel} minute${minutes > 1 ? 's' : ''} `;
    }

    if (hours > 0 || minutes > 0 || seconds > 0) {
      const sLabel = !!label ? TimeService.twoDigitNumber(seconds) : seconds;
      label += `${sLabel} second${seconds > 1 ? 's' : ''}`;
    }

    return label;
  }
}
