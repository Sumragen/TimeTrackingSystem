import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class InjectableStore {
  public static instance: Store<any> | null = null;

  static initialize(store: Store<any>): void {
    InjectableStore.instance = store;
  }
}
