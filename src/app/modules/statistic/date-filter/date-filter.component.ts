import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  public handleStartDateChange(value): void {
    const time: number = new Date(value).getTime();
    const domEvent = new CustomEvent('filterChange', {
      bubbles: true,
      detail: time
    });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
