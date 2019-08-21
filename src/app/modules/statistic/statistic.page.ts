import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from '../../shared/services/storage/storage.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export interface ChartData {
   labels: string[],
   data: number[],
   colors: string[]
}

@Component({
   selector: 'app-statistic',
   templateUrl: './statistic.page.html',
   styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
   public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
         position: 'top', // possibly contain this in settings
      },
      plugins: {
         datalabels: {
            formatter: (value, ctx) => {
               const label = ctx.chart.data.labels[ctx.dataIndex];
               return label;
            },
         },
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
         backgroundColor: [],
      },
   ];


   constructor(private storageService: StorageService,
               private route: ActivatedRoute) {
      const chartData: ChartData = this.route.snapshot.data.chart;
      this.pieChartLabels = chartData.labels;
      this.pieChartData = chartData.data;
      this.pieChartColors[0].backgroundColor = chartData.colors
   }

   ngOnInit() {
   }

   // we could modify data arrays dynamically
   addSlice() {
      this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
      this.pieChartData.push(400);
      this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
   }
}
