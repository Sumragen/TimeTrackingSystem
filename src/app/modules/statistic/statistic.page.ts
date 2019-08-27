import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { convertActivityStorageToChartData } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StatisticService } from './statistic.service';

export interface ChartData {
  labels: string[];
  data: number[];
  colors: Color[];
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss']
})
export class StatisticPage implements OnInit {
  public chart$: Observable<ChartData>;

  public pieChartOptions: ChartOptions;
  public pieChartType: ChartType = 'pie';
  // investigate which plugins exist
  public pieChartPlugins = [pluginDataLabels];

  constructor(
    private storageService: ActivityStorageService,
    private statisticService: StatisticService
  ) {}

  ngOnInit() {
    this.chart$ = this.initChart$();
    this.pieChartOptions = this.initChartOptions();
  }

  private initChart$(): Observable<ChartData> {
    return this.storageService.getStorage().pipe(map(convertActivityStorageToChartData));
  }

  private initChartOptions(): ChartOptions {
    return {
      responsive: true,
      legend: {
        position: 'top' // possibly contain this in settings
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => ctx.chart.data.labels[ctx.dataIndex]
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem: ChartTooltipItem, data: any) => {
            return this.statisticService.convertChartLabelToUserFriendlyText(tooltipItem, data);
          }
        }
      }
    };
  }
}
