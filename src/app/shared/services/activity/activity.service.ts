import { Injectable } from '@angular/core';

import { ActivityCategoryStorage, ActivityStorage, StorageService } from '../storage/storage.service';
import { Activity } from '../../store/reducers/activity.reducer';

export interface ActivityTypeButton {
   color: string,
   label: string
}

@Injectable({
   providedIn: 'root'
})
export class ActivityService {
   constructor(private storageService: StorageService) {
   }

   public getCurrentTypes(): Promise<ActivityTypeButton[]> {
      return this.storageService.getStorage()
         .then((storage: ActivityStorage) => {
            if (!storage) {
               return null;
            }

            const now: number = Date.now();
            const minDateRange: number = now - this.days(7);

            return Object.entries(storage).map(([key, activities]: [string, ActivityCategoryStorage]) => {
               const currentActivities: Activity[] = activities.data.filter((activity: Activity) => {
                  return activity.date > minDateRange;
               });

               return [key, currentActivities.length, activities.color];
            })
               .sort(([, first]: [string, number], [, second]: [string, number]) => {
                  if (first < second) {
                     return 1;
                  }
                  if (first > second) {
                     return -1;
                  }
                  return 0;
               })
               .map(([key, amount, color]: [string, number, string]) => {
                  return {
                     label: key,
                     color
                  }
               });
         });
   }

   public static getRandomRGBAColor() {
      const color = [1, 1, 1];
      const randomColor = color.map(() => Math.floor(Math.random() * 100) + 155).join();
      return `rgba(${randomColor}, 1)`;
   }

   private keysOf(object: Object): string[] {
      return Object.keys(object);
   }

   private hours(amount: number): number {
      return amount * 60 * 60 * 1000;
   }

   private days(amount: number): number {
      return amount * this.hours(24);
   }
}