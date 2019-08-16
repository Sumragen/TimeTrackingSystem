import { ActionCreator, createAction, createReducer, on } from '@ngrx/store';
import { StoreAction } from '../store';
import { ActionType } from '@ngrx/store/src/models';

export enum ACTIVITY_STATUS {
   IDLE = 'IDLE',
   PERFORM = 'PERFORM',
   COMPLETE = 'COMPLETE'
}

export interface Activity {
   type?: string,
   description?: string,
   when?: number
}

export interface ActivityState extends Activity {
   status: ACTIVITY_STATUS
}

const initialState: ActivityState = {
   status: ACTIVITY_STATUS.IDLE
};

function startTime(): ActivityState {
   return {
      status: ACTIVITY_STATUS.PERFORM
   };
}

function stopTime(): ActivityState {
   return {
      status: ACTIVITY_STATUS.IDLE
   };
}

function initialize(state: ActivityState, action: StoreAction): ActivityState {
   if (!!action.payload && action.payload.activity) {
      return action.payload.activity;
   } else {
      return state;
   }
}

export const ActivityActionsKey = {
   IDLE: 'IDLE',
   PERFORM: 'PERFORM',
   COMPLETE: 'COMPLETE',
   INITIALIZE: 'INITIALIZE'
};

export const ActivityActions = {
   [ActivityActionsKey.IDLE]: createAction(ActivityActionsKey.IDLE),
   [ActivityActionsKey.PERFORM]: createAction(ActivityActionsKey.PERFORM),
   [ActivityActionsKey.COMPLETE]: createAction(ActivityActionsKey.COMPLETE),
   [ActivityActionsKey.INITIALIZE]: createAction(ActivityActionsKey.INITIALIZE)
};

export const activityReducer = createReducer<ActivityState>(initialState,
   on(ActivityActions.IDLE, startTime),
   on(ActivityActions.PERFORM, stopTime),
   on(ActivityActions.INITIALIZE, initialize)
);