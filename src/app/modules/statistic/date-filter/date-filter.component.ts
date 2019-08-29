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

  public handleFilterChange(): void {
    const domEvent = new CustomEvent('filterChange', {
      bubbles: true,
      detail: convertFilterDates(this.dateFilter)
    });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
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
  }
}
