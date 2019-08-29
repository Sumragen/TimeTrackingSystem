import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StorageService } from '../../../shared/services/storage/storage.service';

import { ActivityState } from '../store/activity.reducer';
import {
  ActivityStorage
} from './activity-storage.types';
import { ACTIVITY_STATE_STORAGE_KEY, ACTIVITY_STORAGE_KEY } from './storage.keys';

@Injectable({
  providedIn: 'root'
})
export class ActivityStorageService {
  constructor(private storageService: StorageService) {}

  public getStorage(): Observable<ActivityStorage> {
    return this.storageService.getItem(ACTIVITY_STORAGE_KEY);
  }

  public setStorage(storage: ActivityStorage): Observable<void> {
    return this.storageService.setItem<ActivityStorage>(ACTIVITY_STORAGE_KEY, storage);
  }

  public getSavedState(): Observable<any> {
    return this.storageService.getItem(ACTIVITY_STATE_STORAGE_KEY);
  }

  public setSavedState(state: ActivityState): Observable<void> {
    return this.storageService.setItem<ActivityState>(ACTIVITY_STATE_STORAGE_KEY, state);
  }
}
