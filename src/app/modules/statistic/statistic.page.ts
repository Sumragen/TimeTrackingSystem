import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from '../../shared/services/storage/storage.service';

export interface ChartData {
   labels: string[],
   data: number[]
}

@Component({
   selector: 'app-statistic',
   templateUrl: './statistic.page.html',
   styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

   public doughnutChartLabels: string[] = [];
   public doughnutChartData: number[] = [];
   public doughnutChartType: string = 'doughnut';

   constructor(private storageService: StorageService,
               private route: ActivatedRoute) {
      const chartData = this.route.snapshot.data.chart;
      this.doughnutChartLabels = chartData.labels;
      this.doughnutChartData = chartData.data;
   }

   ngOnInit() {
   }

   public chartClicked(e: any): void {
      console.log(e);
   }

   public chartHovered(e: any): void {
      console.log(e);
   }
}
