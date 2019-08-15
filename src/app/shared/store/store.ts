import { Action, ActionReducerMap } from '@ngrx/store';

import { activityReducer, ActivityState } from './reducers/activity.reducer';

export const APP_STATE_KEY: string = 'activity'; // TODO find way how to remove it

export interface STORE_STATE {
   activity: ActivityState,
}

export const reducers: ActionReducerMap<STORE_STATE, Action> = {
   activity: activityReducer
};