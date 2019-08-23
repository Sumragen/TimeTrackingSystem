import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: NativeStorage, private platform: Platform) {}

  public isBrowser(): boolean {
    return this.platform.is('mobileweb');
  }

  public getItem<T>(key: string): Promise<T> {
    if (this.isBrowser()) {
      return Promise.resolve().then(() => JSON.parse(localStorage.getItem(key)));
    } else {
      return this.storage.getItem(key).catch(reason => {
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
