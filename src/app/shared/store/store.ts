import { appReducer, ActivityState } from './reducers/app.reducer';
import { Action, ActionReducerMap } from '@ngrx/store';

export const APP_STATE_KEY: string = 'activity'; // TODO find way how to remove it

export interface STORE_STATE {
   activity: ActivityState,
}

export const reducers: ActionReducerMap<STORE_STATE, Action> = {
   activity: appReducer
};