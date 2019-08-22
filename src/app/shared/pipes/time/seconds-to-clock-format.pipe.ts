import { Pipe, PipeTransform } from '@angular/core';

import { TimeService } from '../../services/time/time.service';

@Pipe({
  name: 'secondsToClockFormat'
})
export class SecondsToClockFormatPipe implements PipeTransform {
  transform(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time - minutes * 60;

    const formattedMinutes: string = TimeService.twoDigitNumber(minutes);
    const formattedSeconds: string = TimeService.twoDigitNumber(seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
