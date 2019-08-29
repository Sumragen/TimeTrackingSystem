import { Dispatch } from '../../../shared/store/decorators/dispatch';
import { ActivityActionsKey } from './activity.reducer';
import { Injectable } from '@angular/core';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import {
  ApplyActivityAction,
  CompleteActivityAction,
  SwitchActivityAction
} from '../models/activity-action.types';

@Injectable()
export class ActivityDispatch {
  @Dispatch()
  public updateType(type: string) {
    return {
      type: ActivityActionsKey.SET_TYPE,
      payload: {
        type
      }
    };
  }

  @Dispatch()
  public completeActivity(): CompleteActivityAction {
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
  public switchActivity(activityType: string): SwitchActivityAction {
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
  public applyActivityType(type: string): ApplyActivityAction {
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
}
