import { Injectable } from '@angular/core';

import { ActivityCategoryStorage, ActivityStorage, StorageService } from '../storage/storage.service';
import { Activity } from '../../store/reducers/activity.reducer';

@Injectable({
   providedIn: 'root'
})
export class ActivityService {
   constructor(private storageService: StorageService) {
   }

   public getCurrentTypes(): Promise<string[]> {
      return this.storageService.getStorage()
         .then((storage: ActivityStorage) => {
            if (!storage) {
               return [];
            }

            const now: number = Date.now();
            const minDateRange: number = now - this.days(7);

            return Object.entries(storage).map(([key, activities]: [string, ActivityCategoryStorage]) => {
               const currentActivities: Activity[] = activities.data.filter((activity: Activity) => {
                  return activity.date > minDateRange;
               });

               return [key, currentActivities.length];
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
               .map(([key]: [string, number]) => key);
         });
   }

   public static getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = 'AAAAAA';
      color = color.split('').map(() => letters[Math.floor(Math.random() * 16)]).join('');
      return `#${color}`;
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