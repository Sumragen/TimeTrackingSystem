import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Activity, ACTIVITY_STATUS, ActivityTypeButton } from '../../models/activity.types';
import { IonInput } from '@ionic/angular';
import { Dispatch } from '../../../../shared/store/decorators/dispatch';
import { PayloadAction, TargetAction } from '../../../../shared/store/store';
import { STORAGE_EFFECT } from '../../../../shared/store/effects/storage.effect';
import { ActivityActionsKey, ActivityState } from '../../store/activity.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ActivityService } from '../../services/activity.service';
import { Observable } from 'rxjs';
import { equals } from 'ramda';

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

  constructor(private activityService: ActivityService, private actions$: Actions) {}

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
        this.switchActivity(type);
      } else {
        if (this.shouldSwitchActivity()) {
          this.switchActivity(this.activityTypeInputEl.value);
        } else {
          this.completeActivity();
        }
      }
    } else {
      this.applyActivityType(type);
    }
    this.activityTypeVisibility = false;
  }

  public toggleTypeInputVisibility(): void {
    this.activityTypeVisibility = !this.activityTypeVisibility;
    if (this.activityTypeVisibility) {
      setTimeout(() => this.activityTypeInputEl.setFocus(), 0);
    }
  }

  public getActionButtonText(status: ACTIVITY_STATUS): string {
    if (this.isIdle(status)) {
      return 'Start';
    } else {
      return this.shouldSwitchActivity() ? 'Switch' : 'Stop';
    }
  }

  private shouldSwitchActivity(): boolean {
    return (
      !!this.activityTypeInputEl &&
      !!this.activityTypeInputEl.value &&
      this.activityTypeInputEl.value.length > 0 &&
      this.activityTypeVisibility
    );
  }

  public isIdle = equals(ACTIVITY_STATUS.IDLE);
  public isPerform = equals(ACTIVITY_STATUS.PERFORM);

  @Dispatch()
  public applyActivityType(
    type: string = this.activityTypeInputEl.value
  ): PayloadAction<TargetAction<PayloadAction<Activity>>> {
    return {
      type: STORAGE_EFFECT.LOG_TIME,
      payload: {
        target: {
          type: ActivityActionsKey.PERFORM,
          payload: {
            type
          }
        }
      }
    };
  }

  @Dispatch()
  public completeActivity() {
    return {
      type: STORAGE_EFFECT.COMPLETE,
      payload: {
        target: {
          type: ActivityActionsKey.COMPLETE
        }
      }
    };
  }

  @Dispatch()
  public switchActivity(activityType: string) {
    return {
      type: STORAGE_EFFECT.COMPLETE,
      payload: {
        target: {
          type: STORAGE_EFFECT.LOG_TIME,
          payload: {
            target: {
              type: ActivityActionsKey.PERFORM,
              payload: {
                type: activityType
              }
            }
          }
        }
      }
    };
  }

  @Dispatch()
  public updateType(type: string) {
    return {
      type: ActivityActionsKey.SET_TYPE,
      payload: {
        type
      }
    };
  }
}
