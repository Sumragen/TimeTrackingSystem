import { Action, ActionCreator, ActionReducerMap } from '@ngrx/store';

import { activityReducer, ActivityState } from './reducers/activity.reducer';

export const ACTIVITY_STATE_KEY: string = 'activity'; // TODO find way how to remove it

export interface STORE_STATE {
   activity: ActivityState,
}

export interface StoreAction extends PayloadAction<STORE_STATE> {}

export interface PayloadAction<T> extends ActionCreator {
   payload: T;
}

export const reducers: ActionReducerMap<STORE_STATE, Action> = {
   activity: activityReducer
};