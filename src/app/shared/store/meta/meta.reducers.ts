import { MetaReducer } from '@ngrx/store';

import { storageMetaReducer } from './storage.meta-reducer';

import { StorageService } from '../../services/storage/storage.service';

export function getMetaReducers(storageService: StorageService): MetaReducer<any> {
   return storageMetaReducer(storageService);
}