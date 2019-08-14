import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
   selector: 'app-statistic',
   templateUrl: './statistic.page.html',
   styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

   public doughnutChartLabels: string[] = [];
   public doughnutChartData: number[] = [];
   public doughnutChartType: string = 'doughnut';

   constructor(private storageService: StorageService) {
   }

   ngOnInit() {
      this.calculateStorageData();
   }

   public chartClicked(e: any): void {
      console.log(e);
   }

   public chartHovered(e: any): void {
      console.log(e);
   }

   private calculateStorageData(): void {
      this.storageService.getRecords().then(storage => {
         if (!storage || Object.keys(storage).length === 0) {
            return null; //todo: display error and navigate back;
         }

         this.doughnutChartLabels = Object.keys(storage);

         this.doughnutChartData = this.doughnutChartLabels.map(label => {
            const records = storage[label];
            return records.reduce((acc, record) => {
               return acc + record.performedTime;
            }, 0);
         })
      });
   }
}
