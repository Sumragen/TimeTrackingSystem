import { Pipe, PipeTransform } from '@angular/core';
import { HSLColor } from '../../../shared/models/colors.models';
import { toHSLA } from '../services/statistic.operators';
import { Color } from 'ng2-charts';

@Pipe({
  name: 'hslToString'
})
export class HslToStringPipe implements PipeTransform {

  transform(colors: HSLColor[], ...args: any[]): Color[] {
    return [{
      backgroundColor: colors.map(toHSLA)
    }];
  }

}
