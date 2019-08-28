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

    return TimeService.millisecondsToUFFormat(milliseconds);
  }
}
