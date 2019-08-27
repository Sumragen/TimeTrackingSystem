import { Injectable } from '@angular/core';
import { ChartTooltipItem } from 'chart.js';

import { TimeService } from '../../shared/services/time/time.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor() {}

  public convertChartLabelToUserFriendlyText(tooltipItem: ChartTooltipItem, data: any) {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const milliseconds = dataset.data[tooltipItem.index];

    const inSeconds: number = Math.floor(milliseconds / 1000);
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
    // adapt to plural and singular
    return label;
  }
}
