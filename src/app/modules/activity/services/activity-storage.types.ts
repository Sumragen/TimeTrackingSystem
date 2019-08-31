import { HSLColor } from '../../../shared/models/colors.models';

import { Activity } from '../models/activity.types';

export interface ActivityStorage {
  [key: string]: ActivityCategoryStorage;
}

export interface ActivityCategoryStorage {
  color: HSLColor;
  data: Required<Activity>[];
}

export type ActivityStorageEntities = [string, ActivityCategoryStorage];

export interface ConciseActivityStorageData {
  type: string;
  activitiesCount: number;
  color: HSLColor;
}
