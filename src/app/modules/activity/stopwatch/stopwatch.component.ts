import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TimeService } from '../../../shared/services/time/time.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  public time$: Observable<number>;

  @Input() initialDate = 0;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    const offset = Math.floor((this.timeService.now() - this.initialDate) / 1000);
    this.time$ = this.setupTimeInterval(offset);
  }

  private setupTimeInterval(offset: number): Observable<number> {
    return interval(1000).pipe(
      map((seconds: number) => seconds + offset + 1),
      startWith(offset)
    );
  }
}
