import { Action } from '@ngrx/store';

export const SWITCH = 'SWITCH';
export const START = 'START';
export const STOP = 'STOP';

export interface ButtonState {
   type: BUTTON_TYPE,
   target: string
}

export enum BUTTON_TYPE {
   START = 'start',
   STOP = 'stop'
}

const initialState: ButtonState = {
   type: BUTTON_TYPE.START,
   target: START
};

function startTime(): ButtonState {
   return {
      type: BUTTON_TYPE.STOP,
      target: STOP
   };
}

function stopTime(): ButtonState {
   return {
      type: BUTTON_TYPE.START,
      target: START
   };
}

export function buttonReducer(state: ButtonState = initialState, action: Action): ButtonState {
   switch (action.type) {
      case START:
         return startTime();
      case STOP:
         return stopTime();
      default:
         return state;
   }
}