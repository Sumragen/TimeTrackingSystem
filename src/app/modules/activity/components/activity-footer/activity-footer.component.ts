import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ACTIVITY_STATUS, ActivityTypeButton } from '../../models/activity.types';
import { IonInput } from '@ionic/angular';
import { ActivityActionsKey, ActivityState } from '../../store/activity.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ActivityService } from '../../services/activity.service';
import { Observable } from 'rxjs';
import { always, cond, equals, ifElse, T } from 'ramda';
import { ActivityDispatch } from '../../store/activity.dispatch';

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
    this.types$ = this.actions$.pipe(
      ofType(ActivityActionsKey.PERFORM, ActivityActionsKey.COMPLETE),
      startWith(null),
      switchMap(() => this.activityService.getCurrentTypes()),
      map((types: ActivityTypeButton[]) => types.slice(0, 4))
    );
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
}