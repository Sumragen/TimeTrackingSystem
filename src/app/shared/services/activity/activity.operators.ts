import { ActivityCategoryStorage } from '../storage/storage.service';
import { Activity } from '../../store/reducers/activity.reducer';
import { gt, pipe, prop } from 'lodash/fp';

const hours = (amount: number): number => amount * 60 * 60 * 1000;
const days = (amount: number): number => amount * hours(24);

export const getLatestActivityTypes = ([type, activities]: [string, ActivityCategoryStorage]) => {
  const now: number = Date.now();
  const minDateRange: number = now - days(7);

  const currentActivities: Activity[] = activities.data.filter(pipe(prop('date'), gt(minDateRange)));

  return {
    type,
    activitiesCount: currentActivities.length,
    color: activities.color
  };
};

export const createActivityTypeButton = ({type, color}) => ({label: type, color});
