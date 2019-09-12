import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Actions, ofType } from '@ngrx/effects';

import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { dropLast, pipe, prop } from 'ramda';
import { isNull } from 'util';

import { ColorPickerPopoverComponent } from '../../shared/components/color-picker-popover/color-picker-popover.component';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { ActivityStorage } from '../activity/services/activity-storage.types';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { StyleService } from '../../shared/services/style/style.service';
import { TimeService } from '../../shared/services/time/time.service';
import { HSLColor } from '../../shared/models/colors.models';

import { convertActivityStorageToChartData } from './services/statistic.operators';
import { StatisticDispatch } from './store/statistic.dispatch';
import { DateFilter } from './components/date-filter/date-filter.component';

export interface ChartData {
  labels: string[];
  data: { amount: number; value: number }[];
  colors: HSLColor[];
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
  private storageUpdate$: Observable<ActivityStorage>;
  @ViewChild('dateFilter', { static: false }) public dateFilterEl: ElementRef;

  constructor(
    private storageService: ActivityStorageService,
    private popoverController: PopoverController,
    private statisticDispatch: StatisticDispatch,
    private actions$: Actions
  ) {}

  ngAfterViewInit() {
    this.dateFilter$ = this.initDateFilter$();
    this.storageUpdate$ = this.actions$.pipe(
      ofType(STORAGE_EFFECT.DID_UPDATE),
      startWith(null)
    );
    this.chart$ = this.initChart$();
  }

  public activityTypeStyle(color: HSLColor): string {
    return StyleService.button(color);
  }

  public async selectColor(chart: ChartData, index: number): Promise<any> {
    const color: HSLColor = chart.colors[index];
    const label: string = chart.labels[index];
    const popover = await this.popoverController.create({
      component: ColorPickerPopoverComponent,
      componentProps: {
        color,
        label
      },
      backdropDismiss: false,
      translucent: true,
      cssClass: 'color-picker-popover'
    });
    popover.onWillDismiss().then((data: OverlayEventDetail<HSLColor>) => {
      if (!isNull(data.data)) {
        this.statisticDispatch.updateType(label, data.data);
      }
    });
    return await popover.present();
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
    return combineLatest([
      this.dateFilter$,
      this.storageService.getStorage(),
      this.storageUpdate$
    ]).pipe(
      map(
        pipe(
          dropLast(1),
          convertActivityStorageToChartData
        )
      )
    );
  }
}
