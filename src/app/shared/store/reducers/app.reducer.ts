import { createAction, createReducer, on } from '@ngrx/store';

export enum APP_STATUS {
   IDLE = 'IDLE',
   PERFORM = 'PERFORM',
   COMPLETE = 'COMPLETE'
}

export interface ActivityState {
   status: APP_STATUS
}

const initialState: ActivityState = {
   status: APP_STATUS.IDLE
};

function startTime(): ActivityState {
   return {
      status: APP_STATUS.PERFORM
   };
}

function stopTime(): ActivityState {
   return {
      status: APP_STATUS.IDLE
   };
}

export enum ActivityActionsKeys {
   IDLE = 'IDLE',
   PERFORM = 'PERFORM',
   COMPLETE = 'COMPLETE'
}

export const ActivityActions = {
   [ActivityActionsKeys.IDLE]: createAction(ActivityActionsKeys.IDLE),
   [ActivityActionsKeys.PERFORM]: createAction(ActivityActionsKeys.PERFORM),
   [ActivityActionsKeys.COMPLETE]: createAction(ActivityActionsKeys.COMPLETE)
};

export const appReducer = createReducer(initialState,
   on(ActivityActions.IDLE, startTime),
   on(ActivityActions.PERFORM, stopTime)
);