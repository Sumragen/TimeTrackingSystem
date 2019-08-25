import { gt, pipe, prop } from 'lodash/fp';

import { Activity, ActivityTypeButton } from '../models/activity.types';
import { ActivityStorageEntities, ConciseActivityStorageData } from './activity-storage.types';
import { lt } from 'ramda';

const hours = (amount: number): number => amount * 60 * 60 * 1000;
const days = (amount: number): number => amount * hours(24);

export const getLatestActivityTypes = ([
  type,
  activities
]: ActivityStorageEntities): ConciseActivityStorageData => {
  const now: number = Date.now();
  const minDateRange: number = now - days(7);

  const currentActivities: Activity[] = activities.data.filter(
    pipe(
      prop('date'),
      lt(minDateRange)
    )
  );

  return {
    type,
    activitiesCount: currentActivities.length,
    color: activities.color
  };
};

export const createActivityTypeButton = ({
  type,
  color
}: ConciseActivityStorageData): ActivityTypeButton => ({ label: type, color });
