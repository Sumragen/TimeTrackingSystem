import { Action, ActionCreator, ActionReducerMap } from '@ngrx/store';

import { Activity, ActivityState } from './reducers/activity.reducer';
import { TypedAction } from '@ngrx/store/src/models';

export const ACTIVITY_STATE_KEY: string = 'activity'; // TODO find way how to remove it

export interface STORE_STATE {
   activity?: ActivityState,
}

export interface StoreAction extends PayloadAction<STORE_STATE> {}

export interface ActivityAction extends PayloadAction<TargetAction<Activity>> {}

export interface TargetAction<T> {
   target: T
}

export interface PayloadAction<T> extends Action {
   payload: T;
}

export const reducers: ActionReducerMap<STORE_STATE, Action> = {
};