import { Action } from '@ngrx/store';

export enum APP_STATUS {
   IDLE = 'IDLE',
   PERFORM = 'PERFORM'
}

export interface AppState {
   status: APP_STATUS,
}

const initialState: AppState = {
   status: APP_STATUS.IDLE
};

function startTime(): AppState {
   return {
      status: APP_STATUS.PERFORM
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
      case APP_STATUS.PERFORM:
         return stopTime();
      default:
         return state;
   }
}