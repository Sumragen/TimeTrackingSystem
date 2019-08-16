import { createAction, createReducer, on } from '@ngrx/store';
import { PayloadAction, StoreAction } from '../store';

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

function perform(state: ActivityState, action: PayloadAction<{type?: string}>): ActivityState {
   return {
      status: ACTIVITY_STATUS.PERFORM,
      type: action.payload.type || state.type
   };
}

function complete(): ActivityState {
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

function setType(state: ActivityState, action: PayloadAction<{ type: string }>): ActivityState {
   return {
      ...state,
      type: action.payload.type
   };
}

function setDescription(state: ActivityState, action: PayloadAction<{ description: string }>): ActivityState {
   return {
      ...state,
      type: action.payload.description
   };
}

//TODO remove those duplications (and also ACTIVITY_STATUS looks the same)
export const ActivityActionsKey = {
   IDLE: 'IDLE',
   PERFORM: 'PERFORM',
   COMPLETE: 'COMPLETE',
   INITIALIZE: 'INITIALIZE',
   SET_TYPE: 'SET_TYPE',
   SET_DESCRIPTION: 'SET_DESCRIPTION'
};

export const ActivityActions = {
   idle: createAction(ActivityActionsKey.IDLE),
   perform: createAction(ActivityActionsKey.PERFORM),
   complete: createAction(ActivityActionsKey.COMPLETE),
   initialize: createAction(ActivityActionsKey.INITIALIZE),
   setType: createAction(ActivityActionsKey.SET_TYPE),
   setDescription: createAction(ActivityActionsKey.SET_DESCRIPTION)
};

export const activityReducer = createReducer<ActivityState>(initialState,
   on(ActivityActions.idle, perform),
   on(ActivityActions.perform, perform),
   on(ActivityActions.complete, complete),
   on(ActivityActions.initialize, initialize),
   on(ActivityActions.setType, setType),
   on(ActivityActions.setDescription, setDescription),
);