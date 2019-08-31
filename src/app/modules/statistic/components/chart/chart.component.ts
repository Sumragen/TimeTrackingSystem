import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChartData } from '../../statistic.page';
import { ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { StatisticService } from '../../services/statistic.service';
import { toHSLA } from '../../services/statistic.operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() public chart: ChartData;
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions;

  // investigate which plugins exist
  public pieChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [pluginDataLabels];
  constructor(private statisticService: StatisticService) {}

  ngOnInit() {
    this.pieChartOptions = this.initChartOptions();
  }

  public getColors(): Color[] {
    return [{
      backgroundColor: this.chart.colors.map(toHSLA)
    }]
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
