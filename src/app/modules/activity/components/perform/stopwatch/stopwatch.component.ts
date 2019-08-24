import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, pluck, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ACTIVITY_STATE_KEY, StoreState } from '../../../../../shared/store/store';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  public time$: Observable<number>;

  constructor(private store: Store<StoreState>) {}

  ngOnInit() {
    this.time$ = this.setupTimeInterval();
  }

  private setupTimeInterval(): Observable<number> {
    return interval(1000).pipe(
      withLatestFrom(this.store.select(ACTIVITY_STATE_KEY).pipe(pluck('date'))),
      map(([, date]: [number, number]) => {
        return Math.floor((Date.now() - date) / 1000);
      })
    );
  }
}
