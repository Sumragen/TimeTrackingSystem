import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'secondsToClockFormat'
})
export class SecondsToClockFormatPipe implements PipeTransform {

   transform(time: number): string {
      const minutes: number = Math.floor(time / 60);
      const seconds: number = time - minutes * 60;
      const formattedMinutes: string = ('0' + minutes).slice(-2);
      const formattedSeconds: string = ('0' + seconds).slice(-2);

      return `${formattedMinutes}:${formattedSeconds}`
   }

}
