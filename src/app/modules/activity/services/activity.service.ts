import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map as mapO } from 'rxjs/operators';

import { HLColor } from '../../../shared/models/colors.models';
import { ActivityTypeButton } from '../models/activity.types';

import { ActivityStorageService } from './activity-storage.service';
import { createActivityTypeButton, getLatestActivityTypes } from './activity.operators';
import { descend, map, pipe, prop, sort, toPairs } from 'ramda';

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
          // TODO: need to resolve typings issue
          // @ts-ignore
          sort(descend(prop('activitiesCount'))),
          map(createActivityTypeButton)
        )
      )
    );
  }
}
