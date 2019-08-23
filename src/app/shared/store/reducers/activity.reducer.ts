import { createAction, createReducer, on } from '@ngrx/store';

import { PayloadAction, StoreAction } from '../store';

export enum ACTIVITY_STATUS {
  IDLE = 'IDLE',
  PERFORM = 'PERFORM',
  COMPLETE = 'COMPLETE'
}

export interface ActivityTime {
  performedTime: number;
  date: number;
}

export interface Activity extends Partial<ActivityTime> {
  type: string;
  description?: string;
}

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
    status: ACTIVITY_STATUS.IDLE
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

// TODO remove those duplications (and also ACTIVITY_STATUS looks the same)
export const ActivityActionsKey = {
  PERFORM: 'PERFORM',
  COMPLETE: 'COMPLETE',
  INITIALIZE: 'INITIALIZE',
  SET_TYPE: 'SET_TYPE',
  SET_DESCRIPTION: 'SET_DESCRIPTION'
};

export const ActivityActions = {
  perform: createAction(ActivityActionsKey.PERFORM),
  complete: createAction(ActivityActionsKey.COMPLETE),
  initialize: createAction(ActivityActionsKey.INITIALIZE),
  setType: createAction(ActivityActionsKey.SET_TYPE),
  setDescription: createAction(ActivityActionsKey.SET_DESCRIPTION)
};

export const activityReducer = createReducer<ActivityState>(
  initialState,
  on(ActivityActions.initialize, initialize),
  on(ActivityActions.perform, perform),
  on(ActivityActions.complete, complete),
  on(ActivityActions.setType, setType),
  on(ActivityActions.setDescription, setDescription)
);
