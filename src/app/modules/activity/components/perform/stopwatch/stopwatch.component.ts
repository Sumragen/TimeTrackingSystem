import { Component, OnInit } from '@angular/core';
import { combineLatest, interval, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ACTIVITY_STATE_KEY } from '../../../../../shared/store/store';
import { Select } from '../../../../../shared/store/decorators/select';
import { ActivityState } from '../../../store/activity.reducer';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  public time$: Observable<number>;
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor() {}

  ngOnInit() {
    this.time$ = this.setupTimeInterval();
  }

  private setupTimeInterval(): Observable<number> {
    return combineLatest(interval(1000), this.state$.pipe(pluck('date'))).pipe(
      map(([, date]: [number, number]) => {
        return Math.floor((Date.now() - date) / 1000);
      })
    );
  }
}
