import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { convertActivityStorageToChartData } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { map, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public isCalendarVisible = false;
  public pieChartOptions: ChartOptions;
  public pieChartType: ChartType = 'pie';
  // investigate which plugins exist
  public pieChartPlugins = [pluginDataLabels];
  public customPickerOptions: any;
  private startDate$: BehaviorSubject<number>;

  constructor(
    private storageService: ActivityStorageService,
    private statisticService: StatisticService
  ) {
    this.customPickerOptions = {
      buttons: [
        {
          text: 'Save',
          handler: () => {
            console.log('Clicked Save!');
            return true;
          }
        },
        {
          text: 'Log',
          handler: () => {
            console.log('Clicked Log. Do not Dismiss.');
            return false;
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.pieChartOptions = this.initChartOptions();
    this.startDate$ = this.initStartDate$();
    this.chart$ = this.initChart$();
  }

  public handleStartDateChange(value): void {
    const time: number = new Date(value).getTime();
    this.startDate$.next(time);
  }

  private initStartDate$(): BehaviorSubject<number> {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const time = new Date(yyyy, mm, dd).getTime();
    return new BehaviorSubject<number>(time);
  }

  private initChart$(): Observable<ChartData> {
    return this.startDate$.pipe(
      withLatestFrom(this.storageService.getStorage()),
      map(convertActivityStorageToChartData)
    );
    // return this.storageService.getStorage().pipe(map(convertActivityStorageToChartData));
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
