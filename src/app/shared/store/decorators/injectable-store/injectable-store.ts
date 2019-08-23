import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class InjectableStore {
  public static instance: Store<StoreState> | null = null;

  static initialize(store: Store<StoreState>): void {
    InjectableStore.instance = store;
  }
}
