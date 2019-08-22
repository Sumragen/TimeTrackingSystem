import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ActivityStorage, StorageService } from '../../shared/services/storage/storage.service';
import { ChartData } from './statistic.page';

export class StatisticResolver implements Resolve<ChartData> {
  constructor(private storageService: StorageService) {}

  public resolve(route: ActivatedRouteSnapshot): Promise<ChartData> {
    return this.storageService.getStorage().then((storage: ActivityStorage) => {
      if (!storage || Object.keys(storage).length === 0) {
        return null; // todo: display error and navigate back;
      }

      const labels = Object.keys(storage);

      const data = labels.map(label => {
        const records = storage[label].data;
        return records.reduce((acc, record) => {
          return acc + record.performedTime;
        }, 0);
      });

      const colors: string[] = labels.map((label: string) => storage[label].color);

      return {
        labels,
        data,
        colors
      };
    });
  }
}
