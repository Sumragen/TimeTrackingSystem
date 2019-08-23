import { Activity } from '../models/activity.types';

export interface ActivityStorage {
  [key: string]: ActivityCategoryStorage;
}

export interface ActivityCategoryStorage {
  color: string;
  data: Activity[];
}

export type ActivityStorageEntities = [string, ActivityCategoryStorage];

export interface ConciseActivityStorageData {
  type: string;
  activitiesCount: number;
  color: string;
}
