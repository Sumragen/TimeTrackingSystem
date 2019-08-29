import { filter, lt, pipe, prop } from 'ramda';

import { Activity, ActivityTypeButton } from '../models/activity.types';
import { ActivityStorageEntities, ConciseActivityStorageData } from './activity-storage.types';

const hours = (amount: number): number => amount * 60 * 60 * 1000;
const days = (amount: number): number => amount * hours(24);

const filterByDate = (minDateRange: number) =>
  filter<Required<Activity>>(
    pipe(
      prop('date'),
      lt(minDateRange)
    )
  );

export const getLatestActivityTypes = ([
  type,
  activities
]: ActivityStorageEntities): ConciseActivityStorageData => {
  const now: number = Date.now();
  const minDateRange: number = now - days(7);

  const currentActivities: Required<Activity>[] = filterByDate(minDateRange)(activities.data);

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
