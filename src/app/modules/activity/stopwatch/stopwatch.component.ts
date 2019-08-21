import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {

  public time$: Observable<number>;

  @Input() initialTime: number = 0;

  constructor() { }

  ngOnInit() {
    this.time$ = this.setupTimeInterval();
  }

  private setupTimeInterval(): Observable<number> {
    return interval(1000).pipe(
       map((seconds: number) => seconds + this.initialTime + 1),
       startWith(0)
    );
  }

}
