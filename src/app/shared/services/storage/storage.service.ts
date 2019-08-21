import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

import { Activity } from '../../store/reducers/activity.reducer';

export const storageKey: string = 'record_storage';

export interface ActivityStorage {
   [key: string]: ActivityCategoryStorage;
}
export interface ActivityCategoryStorage {
   color: string,
   data: Activity[]
}

@Injectable({
   providedIn: 'root'
})
export class StorageService {
   constructor(private storage: NativeStorage,
               private platform: Platform) {
   }

   public isBrowser(): boolean {
      return this.platform.is('mobileweb');
   }

   public async getKeys(): Promise<string[]> {
      const storage = await this.getStorage();

      if (!storage || Object.keys(storage).length === 0) {
         return;
      }
      return Object.keys(storage);
   }

   public getStorage(): Promise<ActivityStorage> {
      return this.getItem(storageKey);
   }

   public setStorage(storage: ActivityStorage): Promise<void> {
      return this.setItem(storageKey, storage);
   }

   public getSavedState(): Promise<any> {
      return this.getItem('activity_state');
   }

   public setSavedState(state: any): Promise<any> {
      return this.setItem('activity_state', state);
   }

   public getItem<T>(key: string): Promise<T> {
      if (this.isBrowser()) {
         return Promise.resolve().then(() => JSON.parse(localStorage.getItem(key)));
      } else {
         return this.storage.getItem(key)
            .catch(reason => {
               if (reason.code === 2) {
                  return null;
               }
            });
      }
   }

   public setItem<T>(key: string, value: T): Promise<void> {
      if (this.isBrowser()) {
         return Promise.resolve().then(() => localStorage.setItem(key, JSON.stringify(value)));
      } else {
         return this.storage.setItem(key, value);
      }

   }
}
