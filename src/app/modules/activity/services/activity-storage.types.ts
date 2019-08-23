import { Activity } from '../../../shared/store/reducers/activity.reducer';

export interface ActivityStorage {
  [key: string]: ActivityCategoryStorage;
}

export interface ActivityCategoryStorage {
  color: string;
  data: Activity[];
}

export const ACTIVITY_STATE_KEY = 'activity_state';
export const ACTIVITY_STORAGE_KEY = 'record_storage';
