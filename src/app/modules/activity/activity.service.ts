import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, pipe, sortBy, toPairs } from 'lodash/fp';
import { ActivityStorage, StorageService } from '../../shared/services/storage/storage.service';
import { createActivityTypeButton, getLatestActivityTypes } from './activity.operators';

export interface ActivityTypeButton {
  color: string;
  label: string;
}

@Injectable()
export class ActivityService {
  constructor(private storageService: StorageService) {}

  public static getRandomRGBAColor() {
    const color = [1, 1, 1];
    const randomColor = color.map(() => Math.floor(Math.random() * 100) + 155).join();
    return `rgba(${randomColor}, 1)`;
  }

  public getCurrentTypes(): Observable<ActivityTypeButton[] | null> {
    return fromPromise(
      this.storageService
        .getStorage()
        .then((storage: ActivityStorage) => (storage ? storage : null))
        .then(
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
