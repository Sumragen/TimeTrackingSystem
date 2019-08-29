import { createAction, createReducer, on } from '@ngrx/store';

import { PayloadAction } from '../../../shared/store/store';
import { Activity, ACTIVITY_STATUS } from '../models/activity.types';

export interface ActivityState extends Partial<Activity> {
  status: ACTIVITY_STATUS;
}

const initialState: ActivityState = {
  status: ACTIVITY_STATUS.IDLE
};

function perform(state: ActivityState, action: PayloadAction<Activity>): ActivityState {
  return {
    ...action.payload,
    status: ACTIVITY_STATUS.PERFORM
  };
}

function complete(): ActivityState {
  return {
    status: ACTIVITY_STATUS.IDLE,
    type: ''
  };
}

function initialize(state: ActivityState, action: PayloadAction<ActivityState>): ActivityState {
  if (!!action.payload) {
    return action.payload;
  } else {
    return state;
  }
}

function setType(state: ActivityState, action: PayloadAction<{ type: string }>): ActivityState {
  let type: string = action.payload.type;

  if (type.length === 1) {
    type = type.toUpperCase();
  }

  return {
    ...state,
    type
  };
}

function setDescription(
  state: ActivityState,
  action: PayloadAction<{ description: string }>
): ActivityState {
  return {
    ...state,
    description: action.payload.description
  };
}

export const ActivityActionsKey = {
  PERFORM: 'PERFORM',
  COMPLETE: 'COMPLETE',
  INITIALIZE: 'INITIALIZE',
  SET_TYPE: 'SET_TYPE',
  SET_DESCRIPTION: 'SET_DESCRIPTION'
};

export const activityReducer = createReducer<ActivityState>(
  initialState,
  on(createAction(ActivityActionsKey.INITIALIZE), initialize),
  on(createAction(ActivityActionsKey.PERFORM), perform),
  on(createAction(ActivityActionsKey.COMPLETE), complete),
  on(createAction(ActivityActionsKey.SET_TYPE), setType),
  on(createAction(ActivityActionsKey.SET_DESCRIPTION), setDescription)
);
