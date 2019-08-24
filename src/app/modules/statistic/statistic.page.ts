import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { StorageService } from '../../shared/services/storage/storage.service';
import { TimeService } from '../../shared/services/time/time.service';
import { HLColor } from '../../shared/models/colors.models';

export interface ChartData {
  labels: string[];
  data: number[];
  colors: HLColor[];
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss']
})
export class StatisticPage implements OnInit {
  public pieChartOptions: ChartOptions = {
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
    }
  };
  // activity type array
  public pieChartLabels: Label[] = [];
  // activity spent time
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  // investigate which plugins exist
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      // activity type colors
      backgroundColor: []
    }
  ];

  constructor(private storageService: StorageService, private route: ActivatedRoute) {
    const chartData: ChartData = this.route.snapshot.data.chart;
    this.pieChartLabels = chartData.labels;
    this.pieChartData = chartData.data;
    this.pieChartColors[0].backgroundColor = chartData.colors.map(
      (color: HLColor) => `hsla(${color.hue}, 100%, ${color.luminance}%, 1)`
    );
  }

  ngOnInit() {}
}
