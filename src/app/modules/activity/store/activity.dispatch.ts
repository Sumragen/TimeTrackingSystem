import { Dispatch } from '../../../shared/store/decorators/dispatch';
import { ActivityActionsKey, ActivityState } from './activity.reducer';
import { Injectable } from '@angular/core';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import {
  ApplyActivityAction,
  CompleteActivityAction,
  SwitchActivityAction
} from '../models/activity-action.types';
import { PayloadAction, PayloadTargetAction } from '../../../shared/store/store';
import { Activity } from '../models/activity.types';
import { ActionBuilder } from '../../../shared/store/action-builder';

@Injectable()
export class ActivityDispatch {
  @Dispatch()
  public updateType(type: string) {
    return ActionBuilder.payload(ActivityActionsKey.SET_TYPE, { type });
  }

  @Dispatch()
  public completeActivity(): CompleteActivityAction {
    return ActionBuilder.payloadTarget(STORAGE_EFFECT.COMPLETE, {
      type: ActivityActionsKey.COMPLETE
    });
  }

  @Dispatch()
  public switchActivity(activityType: string): SwitchActivityAction {
    return ActionBuilder.payloadTarget(
      STORAGE_EFFECT.COMPLETE,
      ActionBuilder.payloadTarget(
        STORAGE_EFFECT.LOG_TIME,
        ActionBuilder.payload(ActivityActionsKey.PERFORM, {
          type: activityType
        })
      )
    );
  }

  @Dispatch()
  public applyActivityType(type: string): ApplyActivityAction {
    return ActionBuilder.payloadTarget(
      STORAGE_EFFECT.LOG_TIME,
      ActionBuilder.payload<Activity>(ActivityActionsKey.PERFORM, { type })
    );
  }

  @Dispatch()
  public initialize(state: ActivityState): PayloadAction<ActivityState> {
    return ActionBuilder.payload(ActivityActionsKey.INITIALIZE, state);
  }
}
