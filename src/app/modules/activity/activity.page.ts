import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivityActionsKey, ActivityState } from './store/activity.reducer';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { ACTIVITY_STATE_KEY, PayloadAction, TargetAction } from '../../shared/store/store';
import { ActivityStorageService } from './services/activity-storage.service';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { Select } from '../../shared/store/decorators/select';
import { Observable } from 'rxjs';
import { Activity, ACTIVITY_STATUS, ActivityTypeButton } from './models/activity.types';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { ActivityService } from './services/activity.service';
import { Actions, ofType } from '@ngrx/effects';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;
  @ViewChild('activityTypeInput', { static: false }) public activityTypeInputEl: IonInput;
  public types$: Observable<ActivityTypeButton[]>;
  public activityType = '';
  public activityTypeVisibility: boolean;

  constructor(
    private storageService: ActivityStorageService,
    private activityService: ActivityService,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.setupInitialStoreState();
    this.types$ = this.actions$.pipe(
      ofType(ActivityActionsKey.PERFORM, ActivityActionsKey.COMPLETE),
      startWith(null),
      switchMap(() => this.activityService.getCurrentTypes()),
      map((types: ActivityTypeButton[]) => types.slice(0, 4))
    );
  }

  private setupInitialStoreState(): void {
    this.storageService
      .getSavedState()
      .pipe(
        tap(this.initialize),
        tap(
          (state: ActivityState) =>
            (this.activityTypeVisibility = !state || !this.isPerform(state.status))
        )
      )
      .subscribe();
  }

  public isPerform(status: ACTIVITY_STATUS): boolean {
    return status === ACTIVITY_STATUS.PERFORM;
  }

  public isIdle(status: ACTIVITY_STATUS): boolean {
    return status === ACTIVITY_STATUS.IDLE;
  }

  public handleActivityButtonClick(status: ACTIVITY_STATUS, type?: string): void {
    if (this.isPerform(status)) {
      if (type) {
        this.switchActivity(type);
      } else {
        if (this.shouldSwitchActivity()) {
          this.switchActivity(this.activityType);
        } else {
          this.completeActivity();
        }
      }
    } else {
      this.applyActivityType(type);
    }

    this.activityType = '';
    this.activityTypeVisibility = false;
  }

  public toggleTypeInputVisibility(): void {
    this.activityType = '';
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
    return this.activityType.length > 0 && this.activityTypeVisibility;
  }

  @Dispatch()
  private initialize(state: ActivityState): PayloadAction<ActivityState> {
    return {
      type: ActivityActionsKey.INITIALIZE,
      payload: state
    };
  }

  @Dispatch()
  public applyActivityType(type?: string): PayloadAction<TargetAction<PayloadAction<Activity>>> {
    type = type || this.activityType;
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
  public updateDescription(description: string) {
    return {
      type: ActivityActionsKey.SET_DESCRIPTION,
      payload: {
        description
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
