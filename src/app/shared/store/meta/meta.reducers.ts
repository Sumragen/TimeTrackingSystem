import { MetaReducer } from '@ngrx/store';

import { ActivityStorageService } from '../../../modules/activity/services/activity-storage.service';

import { storageMetaReducer } from './storage.meta-reducer';

export function getMetaReducers(storageService: ActivityStorageService): MetaReducer<any> {
  return storageMetaReducer(storageService);
}
