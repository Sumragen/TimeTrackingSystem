import { Dispatch } from '../../../shared/store/decorators/dispatch';
import { ActivityActionsKey } from './activity.reducer';
import { Injectable } from '@angular/core';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import {
  ApplyActivityAction,
  CompleteActivityAction,
  SwitchActivityAction
} from '../models/activity-action.types';
import { PayloadAction, PayloadTargetAction } from '../../../shared/store/store';
import { Activity } from '../models/activity.types';

@Injectable()
export class ActivityDispatch {
  @Dispatch()
  public updateType(type: string) {
    return ActivityDispatch.payload(ActivityActionsKey.SET_TYPE, { type });
  }

  @Dispatch()
  public completeActivity(): CompleteActivityAction {
    return ActivityDispatch.payloadTarget(STORAGE_EFFECT.COMPLETE, {
      type: ActivityActionsKey.COMPLETE
    });
  }

  @Dispatch()
  public switchActivity(activityType: string): SwitchActivityAction {
    return ActivityDispatch.payloadTarget(
      STORAGE_EFFECT.COMPLETE,
      ActivityDispatch.payloadTarget(
        STORAGE_EFFECT.LOG_TIME,
        ActivityDispatch.payload(ActivityActionsKey.PERFORM, {
          type: activityType
        })
      )
    );
  }

  @Dispatch()
  public applyActivityType(type: string): ApplyActivityAction {
    return ActivityDispatch.payloadTarget(
      STORAGE_EFFECT.LOG_TIME,
      ActivityDispatch.payload<Activity>(ActivityActionsKey.PERFORM, { type })
    );
  }

  private static payload<T>(type: string, payload: T): PayloadAction<T> {
    return {
      type,
      payload
    };
  }
  private static payloadTarget<T>(type: string, target: T): PayloadTargetAction<T> {
    return ActivityDispatch.payload(type, {
      target
    });
  }
}
