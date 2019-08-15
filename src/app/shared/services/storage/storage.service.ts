import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

export const recordStorageKey: string = 'record_storage';

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
      const storage = await this.getRecords();

      if (!storage || Object.keys(storage).length === 0) {
         return;
      }
      return Object.keys(storage);
   }

   public getRecords(): Promise<any> {
      return this.getItem(recordStorageKey);
   }

   public setRecords(storage: any): Promise<any> {
      return this.setItem(recordStorageKey, storage);
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
