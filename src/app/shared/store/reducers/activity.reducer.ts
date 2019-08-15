import { createAction, createReducer, on } from '@ngrx/store';

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

export const ActivityActions = {
   [ACTIVITY_STATUS.IDLE]: createAction(ACTIVITY_STATUS.IDLE),
   [ACTIVITY_STATUS.PERFORM]: createAction(ACTIVITY_STATUS.PERFORM),
   [ACTIVITY_STATUS.COMPLETE]: createAction(ACTIVITY_STATUS.COMPLETE)
};

export const activityReducer = createReducer(initialState,
   on(ActivityActions.IDLE, startTime),
   on(ActivityActions.PERFORM, stopTime)
);