import { Store } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { InjectableStore } from './injectable-store';

@NgModule()
export class InjectableStoreModule {
  constructor(private store: Store<any>) {
    if (!InjectableStore.instance) {
      InjectableStore.initialize(store);
    }
  }
}
