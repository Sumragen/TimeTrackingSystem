import { Action, ActionReducerMap } from '@ngrx/store';

import { Activity, ActivityState } from './reducers/activity.reducer';

export const ACTIVITY_STATE_KEY = 'activity'; // TODO find way how to remove it

export interface StoreState {
  activity?: ActivityState;
}

export interface PayloadAction<T> extends Action {
  payload: T;
}

export interface StoreAction extends PayloadAction<StoreState> {}

export interface ActivityAction extends PayloadAction<TargetAction<Activity>> {}

export interface TargetAction<T> {
  target: T;
}

export const reducers: ActionReducerMap<StoreState, Action> = {};
