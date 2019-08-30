import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from 'ng2-charts';
import { convertActivityStorageToChartData } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { TimeService } from '../../shared/services/time/time.service';
import { prop } from 'ramda';
import { DateFilter } from './date-filter/date-filter.component';

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
  public isFilterHidden = true;
  public chart$: Observable<ChartData>;
  private dateFilter$: Observable<DateFilter>;
  @ViewChild('dateFilter', { static: false }) public dateFilterEl: ElementRef;

  constructor(private storageService: ActivityStorageService) {}

  ngAfterViewInit() {
    this.dateFilter$ = this.initDateFilter$();
    this.chart$ = this.initChart$();
  }

  public toggleDatepicker(): void {
    this.isFilterHidden = !this.isFilterHidden;
  }

  public convertTime(value: number): string {
    return TimeService.millisecondsToUFFormat(value);
  }

  private initDateFilter$(): Observable<DateFilter> {
    return fromEvent(this.dateFilterEl.nativeElement, 'filterChange').pipe(map(prop('detail')));
  }

  private initChart$(): Observable<ChartData> {
    return combineLatest([this.dateFilter$, this.storageService.getStorage()]).pipe(
      map(convertActivityStorageToChartData)
    );
  }
}
