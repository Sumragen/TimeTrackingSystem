import { Component, ElementRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { convertFilterDates } from '../statistic.operators';

export interface DateFilter {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  public dateFilter: DateFilter;
  public displayFormat = 'YYYY MMM DD HH:mm';
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.applyDefaultFilter();
  }

  public applyYesterday(): void {
    this.filterYesterday();
    this.handleFilterChange();
  }
  public applyToday(): void {
    this.filterToday();
    this.handleFilterChange();
  }

  public handleFilterChange(): void {
    const domEvent = new CustomEvent('filterChange', {
      bubbles: true,
      detail: convertFilterDates(this.dateFilter)
    });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }

  public filterYesterday(): void {
    this.dateFilter = {
      from: moment()
        .subtract(1, 'days')
        .startOf('day')
        .toString(),
      to: moment()
        .subtract(1, 'days')
        .endOf('day')
        .toString()
    };
  }

  public filterToday(): void {
    this.dateFilter = {
      from: moment()
        .startOf('day')
        .toString(),
      to: moment()
        .endOf('day')
        .toString()
    };
  }

  private applyDefaultFilter(): void {
    this.filterToday();
    this.handleFilterChange();
  }
}
