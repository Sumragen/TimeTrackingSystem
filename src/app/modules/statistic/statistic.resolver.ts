import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { StorageService } from '../../shared/services/storage/storage.service';

export class StatisticResolver implements Resolve<any> {
   constructor(private storageService: StorageService) {}

   public resolve(route: ActivatedRouteSnapshot): Promise<any> {
      return this.storageService.getRecords().then(storage => {
         if (!storage || Object.keys(storage).length === 0) {
            return null; //todo: display error and navigate back;
         }

         const labels = Object.keys(storage);

         const data = labels.map(label => {
            const records = storage[label];
            return records.reduce((acc, record) => {
               return acc + record.performedTime;
            }, 0);
         });

         return {
            labels,
            data
         }
      })
   }
}