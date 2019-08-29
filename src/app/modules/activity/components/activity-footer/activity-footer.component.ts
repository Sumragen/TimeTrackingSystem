import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { always, cond, equals, ifElse, T } from 'ramda';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ActivityService } from '../../services/activity.service';
import { ActivityActionsKey, ActivityState } from '../../store/activity.reducer';
import { ActivityDispatch } from '../../store/activity.dispatch';
import { ACTIVITY_STATUS, ActivityTypeButton } from '../../models/activity.types';

@Component({
  selector: 'app-activity-footer',
  templateUrl: './activity-footer.component.html',
  styleUrls: ['./activity-footer.component.scss']
})
export class ActivityFooterComponent implements OnInit {
  public activityTypeVisibility: boolean;
  public types$: Observable<ActivityTypeButton[]>;

  @Input() state: ActivityState;
  @ViewChild('activityTypeInput', { static: false }) public activityTypeInputEl: IonInput;

  public isIdle = equals(ACTIVITY_STATUS.IDLE);
  public isPerform = equals(ACTIVITY_STATUS.PERFORM);

  constructor(
    private activityService: ActivityService,
    private actions$: Actions,
    private activityDispatch: ActivityDispatch
  ) {}

  ngOnInit() {
    this.types$ = this.initTypes$();
  }

  public isActionButtonDisabled(): boolean {
    return (
      (!this.activityTypeInputEl || !this.activityTypeInputEl.value) &&
      !this.isPerform(this.state.status)
    );
  }

  public handleActivityButtonClick(status: ACTIVITY_STATUS, type?: string): void {
    if (this.isPerform(status)) {
      if (type) {
        this.activityDispatch.switchActivity(type);
      } else {
        if (this.shouldSwitchActivity()) {
          this.activityDispatch.switchActivity(this.activityTypeInputEl.value);
        } else {
          this.activityDispatch.completeActivity();
        }
      }
    } else {
      this.activityDispatch.applyActivityType(type || this.activityTypeInputEl.value);
    }

    this.activityTypeVisibility = false;
  }

  public toggleTypeInputVisibility(): void {
    this.activityTypeVisibility = !this.activityTypeVisibility;
    if (this.activityTypeVisibility) {
      setTimeout(() => this.activityTypeInputEl.setFocus(), 0);
    }
  }

  public getActionText = cond([
    [this.isIdle, always('start')],
    [T, ifElse(this.shouldSwitchActivity, always('switch'), always('stop'))]
  ]);

  private shouldSwitchActivity(): boolean {
    return (
      !!this.activityTypeInputEl &&
      !!this.activityTypeInputEl.value &&
      this.activityTypeInputEl.value.length > 0 &&
      this.activityTypeVisibility
    );
  }

  private initTypes$(): Observable<ActivityTypeButton[]> {
    return this.actions$.pipe(
      ofType(ActivityActionsKey.PERFORM, ActivityActionsKey.COMPLETE),
      startWith(null),
      switchMap(() => this.activityService.getCurrentTypes()),
      map((types: ActivityTypeButton[]) => types.slice(0, 4))
    );
  }
}
