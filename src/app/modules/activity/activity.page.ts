import { Component, OnInit } from '@angular/core';

import { ActivityActionsKey, ActivityState } from './store/activity.reducer';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { ACTIVITY_STATE_KEY, PayloadAction, TargetAction } from '../../shared/store/store';
import { ActivityStorageService } from './services/activity-storage.service';
import { map, tap } from 'rxjs/operators';
import { Select } from '../../shared/store/decorators/select';
import { Observable } from 'rxjs';
import { Activity, ACTIVITY_STATUS, ActivityTypeButton } from './models/activity.types';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;
  public types$: Observable<ActivityTypeButton[]>;
  public activityType = '';
  public activityTypeVisibility: boolean;

  constructor(
    private storageService: ActivityStorageService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.setupInitialStoreState();

    this.types$ = this.activityService
      .getCurrentTypes()
      .pipe(map((types: ActivityTypeButton[]) => types.slice(0, 4)));
  }

  private setupInitialStoreState(): void {
    this.storageService
      .getSavedState()
      .pipe(
        tap(this.initialize),
        tap((state: ActivityState) => (this.activityTypeVisibility = !this.isPerform(state.status)))
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
    this.isPerform(status) ? this.completeActivity() : this.applyActivityType(type);
    this.activityType = '';
    this.activityTypeVisibility = false;
  }

  public toggleTypeInputVisibility(): void {
    this.activityTypeVisibility = !this.activityTypeVisibility;
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
