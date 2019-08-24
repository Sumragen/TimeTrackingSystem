import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ChartData } from './statistic.page';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { ActivityStorage } from '../activity/services/activity-storage.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HLColor } from '../../shared/models/colors.models';

export class StatisticResolver implements Resolve<ChartData> {
  constructor(private storageService: ActivityStorageService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ChartData> {
    return this.storageService.getStorage().pipe(
      map((storage: ActivityStorage) => {
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

        const colors: HLColor[] = labels.map((label: string) => storage[label].color);

        return {
          labels,
          data,
          colors
        };
      })
    );
  }
}
