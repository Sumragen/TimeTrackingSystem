import { Action } from '@ngrx/store';

export enum APP_STATUS {
   IDLE = 'IDLE',
   PERFORMING = 'PERFORMING'
}

export interface AppState {
   status: APP_STATUS,
}

const initialState: AppState = {
   status: APP_STATUS.IDLE
};

function startTime(): AppState {
   return {
      status: APP_STATUS.PERFORMING
   };
}

function stopTime(): AppState {
   return {
      status: APP_STATUS.IDLE
   };
}

export function appReducer(state: AppState = initialState, action: Action): AppState {
   switch (action.type) {
      case APP_STATUS.IDLE:
         return startTime();
      case APP_STATUS.PERFORMING:
         return stopTime();
      default:
         return state;
   }
}