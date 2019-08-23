import { Injectable } from '@angular/core';
import { StorageService } from '../../../shared/services/storage/storage.service';
import {
  ACTIVITY_STATE_KEY,
  ACTIVITY_STORAGE_KEY,
  ActivityStorage
} from './activity-storage.types';

@Injectable()
export class ActivityStorageService {
  constructor(private storageService: StorageService) {}

  public getStorage(): Promise<ActivityStorage> {
    return this.storageService.getItem(ACTIVITY_STORAGE_KEY);
  }

  public setStorage(storage: ActivityStorage): Promise<void> {
    return this.storageService.setItem(ACTIVITY_STORAGE_KEY, storage);
  }

  public getSavedState(): Promise<any> {
    return this.storageService.getItem(ACTIVITY_STATE_KEY);
  }

  public setSavedState(state: any): Promise<any> {
    return this.storageService.setItem(ACTIVITY_STATE_KEY, state);
  }
}
