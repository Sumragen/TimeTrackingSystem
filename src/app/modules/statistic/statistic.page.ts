import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';
import { Color } from 'ng2-charts';
import { convertActivityStorageToChartData } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { TimeService } from '../../shared/services/time/time.service';

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
  private startDate$: BehaviorSubject<number>;

  constructor(private storageService: ActivityStorageService) {}

  ngOnInit() {
    this.startDate$ = StatisticPage.initStartDate$();
    this.chart$ = this.initChart$();
  }

  public handleStartDateChange(value): void {
    const time: number = new Date(value).getTime();
    this.startDate$.next(time);
    this.isCalendarVisible = false;
  }

  public toggleDatepicker(): void {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  public convertTime(value: number): string {
    return TimeService.millisecondsToUFFormat(value);
  }

  private static initStartDate$(): BehaviorSubject<number> {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const time = new Date(yyyy, mm, dd).getTime();
    return new BehaviorSubject<number>(time);
  }

  private initChart$(): Observable<ChartData> {
    return this.startDate$.pipe(
      combineLatest(this.storageService.getStorage()),
      map(convertActivityStorageToChartData)
    );
    // return this.storageService.getStorage().pipe(map(convertActivityStorageToChartData));
  }
}
