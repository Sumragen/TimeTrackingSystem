import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: NativeStorage, private platform: Platform) {}

  // TODO this method looks like not storage service. It should be in own specific service
  public isBrowser(): boolean {
    return this.platform.is('mobileweb');
  }

  public getItem<T>(key: string): Observable<T | null> {
    if (this.isBrowser()) {
      return of(JSON.parse(localStorage.getItem(key)));
    } else {
      return fromPromise(this.storage.getItem(key).catch(reason => {
        if (reason.code === 2) {
          return null;
        }
      }));
    }
  }

  public setItem<T>(key: string, value: T): Observable<void> {
    if (this.isBrowser()) {
      return of(localStorage.setItem(key, JSON.stringify(value)));
    } else {
      return fromPromise(this.storage.setItem(key, value));
    }
  }
}
