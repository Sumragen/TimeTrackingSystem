import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map as mapO } from 'rxjs/operators';
import { map, pipe, sortBy, toPairs } from 'lodash/fp';

import { HLColor } from '../../../shared/models/colors.models';
import { ActivityTypeButton } from '../models/activity.types';

import { ActivityStorageService } from './activity-storage.service';
import { createActivityTypeButton, getLatestActivityTypes } from './activity.operators';

@Injectable()
export class ActivityService {
  constructor(private storageService: ActivityStorageService) {}

  public static getRandomHLColor(): HLColor {
    const hue = Math.floor(Math.random() * 36) * 10;
    const luminance = Math.floor(Math.random() * 17) + 50;

    return { hue, luminance };
  }

  public getCurrentTypes(): Observable<ActivityTypeButton[] | null> {
    return this.storageService.getStorage().pipe(
      mapO(
        pipe(
          toPairs,
          map(getLatestActivityTypes),
          sortBy('activitiesCount'),
          map(createActivityTypeButton)
        )
      )
    );
  }
}
