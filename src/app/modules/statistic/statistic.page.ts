import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from 'ng2-charts';
import { convertActivityStorageToChartData, toHSLA } from './statistic.operators';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { TimeService } from '../../shared/services/time/time.service';
import { prop } from 'ramda';
import { DateFilter } from './date-filter/date-filter.component';
import { PopoverController } from '@ionic/angular';
import { ColorPickerPopoverComponent } from '../../shared/components/color-picker-popover/color-picker-popover.component';
import { StyleService } from '../../shared/services/style/style.service';
import { HSLColor } from '../../shared/models/colors.models';

export interface ChartData {
  labels: string[];
  data: number[];
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
  @ViewChild('dateFilter', { static: false }) public dateFilterEl: ElementRef;

  constructor(
    private storageService: ActivityStorageService,
    private popoverController: PopoverController
  ) {}

  ngAfterViewInit() {
    this.dateFilter$ = this.initDateFilter$();
    this.chart$ = this.initChart$();
  }

  public bgStyle(color: HSLColor): string {
    return StyleService.bg(toHSLA(color));
  }

  public async selectColor(color: HSLColor): Promise<any> {
    const popover = await this.popoverController.create({
      component: ColorPickerPopoverComponent,
      componentProps: {
        color
      },
      translucent: true,
      cssClass: 'color-picker-popover'
    });
    popover.onDidDismiss().then(data => {
      console.log(data);
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
    return combineLatest([this.dateFilter$, this.storageService.getStorage()]).pipe(
      map(convertActivityStorageToChartData)
    );
  }
}
