import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { toPairs, map, gt, prop, sortBy, pipe } from 'lodash/fp';

import { Activity } from '../../store/reducers/activity.reducer';
import { ActivityCategoryStorage, ActivityStorage, StorageService } from '../storage/storage.service';

export interface ActivityTypeButton {
   color: string,
   label: string
}

const hours = (amount: number): number => amount * 60 * 60 * 1000;
const days = (amount: number): number => amount * hours(24);

const getLatestActivityTypes = ([type, activities]: [string, ActivityCategoryStorage]) => {
  const now: number = Date.now();
  const minDateRange: number = now - days(7);

  const currentActivities: Activity[] = activities.data.filter(pipe(prop('date'), gt(minDateRange)));

  return {
    type,
    activitiesCount: currentActivities.length,
    color: activities.color
  };
};

// const world = ([, first]: [string, number], [, second]: [string, number]) => {
//   if (first < second) {
//     return 1;
//   }
//   if (first > second) {
//     return -1;
//   }
//   return 0;
// };

const createActivityTypeButton = ({type, color}) => ({ label: type, color });
// const createActivityTypeButton = pipe(
//   omit(['activitiesCount']),
//   renameProp('type', 'label')
// );

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private storageService: StorageService) {
  }
  //
  // public getCurrentTypes(): Promise<ActivityTypeButton[]> {
  //   return this.storageService.getStorage()
  //     .then((storage: ActivityStorage) => {
  //       if (!storage) {
  //         return null;
  //       }
  //
  //       const now: number = Date.now();
  //       const minDateRange: number = now - this.days(7);
  //
  //       return Object.entries(storage).map(([key, activities]: [string, ActivityCategoryStorage]) => {
  //         const currentActivities: Activity[] = activities.data.filter((activity: Activity) => {
  //           return activity.date > minDateRange;
  //         });
  //
  //         return [key, currentActivities.length, activities.color];
  //       })
  //         .sort(([, first]: [string, number], [, second]: [string, number]) => {
  //           if (first < second) {
  //             return 1;
  //           }
  //           if (first > second) {
  //             return -1;
  //           }
  //           return 0;
  //         })
  //         .map(([key, amount, color]: [string, number, string]) => {
  //           return {
  //             label: key,
  //             color
  //           }
  //         });
  //     });
  // }

  public getCurrentTypes(): Observable<ActivityTypeButton[] | null> {
    return fromPromise(this.storageService.getStorage()
      .then((storage: ActivityStorage) => storage ? storage : null)
      .then(pipe(
        toPairs,
        map(getLatestActivityTypes),
        sortBy('activityCount'),
        map(createActivityTypeButton)
      )));
   }

   public static getRandomRGBAColor() {
      const color = [1, 1, 1];
      const randomColor = color.map(() => Math.floor(Math.random() * 100) + 155).join();
      return `rgba(${randomColor}, 1)`;
   }

   private keysOf(object: Object): string[] {
      return Object.keys(object);
   }

}
