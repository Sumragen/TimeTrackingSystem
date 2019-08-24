import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map as mapO } from 'rxjs/operators';
import { map, pipe, sortBy, toPairs } from 'lodash/fp';

import { createActivityTypeButton, getLatestActivityTypes } from './activity.operators';
import { ActivityStorageService } from './activity-storage.service';
import { ActivityTypeButton } from '../models/activity.types';

@Injectable()
export class ActivityService {
  constructor(private storageService: ActivityStorageService) {}

  public static getRandomRGBAColor() {
    const hue = Math.floor(Math.random() * 36) * 10;
    const luminance = Math.floor(Math.random() * 7) + 60;

    return `hsla(${hue}, 100%, ${luminance}%, 1)`;
  }

  public getCurrentTypes(): Observable<ActivityTypeButton[] | null> {
    return this.storageService.getStorage().pipe(
      mapO(
        pipe(
          toPairs,
          map(getLatestActivityTypes),
          sortBy('activityCount'),
          map(createActivityTypeButton)
        )
      )
    );
  }
}
