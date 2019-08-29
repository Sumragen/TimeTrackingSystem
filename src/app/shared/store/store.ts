import { Action, ActionReducerMap } from '@ngrx/store';

import { ActivityState } from '../../modules/activity/store/activity.reducer';
import { Activity } from '../../modules/activity/models/activity.types';

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

export type PayloadTargetAction<T> = PayloadAction<TargetAction<T>>;

export const reducers: ActionReducerMap<StoreState, Action> = {};
