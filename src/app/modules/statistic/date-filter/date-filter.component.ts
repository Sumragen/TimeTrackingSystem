import { Component, ElementRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { fromPairs, map, pipe, toPairs } from 'ramda';
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
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.dateFilter = {
      from: moment()
        .startOf('day')
        .toString(),
      to: moment().toString()
    };
  }

  public handleFilterChange(): void {
    const domEvent = new CustomEvent('filterChange', {
      bubbles: true,
      detail: convertFilterDates(this.dateFilter)
    });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
