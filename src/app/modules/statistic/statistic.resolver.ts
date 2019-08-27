import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

import { ChartData } from './statistic.page';
import { ActivityStorageService } from '../activity/services/activity-storage.service';
import { Observable } from 'rxjs';
import { convertActivityStorageToChartData } from './statistic.operators';


export class StatisticResolver implements Resolve<ChartData> {
  constructor(private storageService: ActivityStorageService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ChartData> {
    return this.storageService.getStorage().pipe(
      map(convertActivityStorageToChartData)
    );
  }
}
