import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Color } from 'ng2-charts';
import { convertActivityStorageToChartData } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { TimeService } from '../../shared/services/time/time.service';
import { prop } from 'ramda';

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
export class StatisticPage implements AfterViewInit {
  public chart$: Observable<ChartData>;

  public isCalendarVisible = false;
  private startDate$: BehaviorSubject<number>;

  @ViewChild('dateFilter', { static: false }) public dateFilterEl: ElementRef;
  constructor(private storageService: ActivityStorageService) {}

  ngAfterViewInit() {
    this.startDate$ = StatisticPage.initStartDate$();
    this.chart$ = this.initChart$();
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
    return combineLatest([
      fromEvent(this.dateFilterEl.nativeElement, 'filterChange')
         .pipe(map(prop('detail'))),
      this.storageService.getStorage()
    ]).pipe(
      tap(v => console.log(v)),
      map(convertActivityStorageToChartData)
    );
    // return this.storageService.getStorage().pipe(map(convertActivityStorageToChartData));
  }
}
