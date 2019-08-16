import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StorageService } from '../../../shared/services/storage/storage.service';
import { select, Store } from '@ngrx/store';
import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../../shared/store/store';
import { ACTIVITY_STATUS, ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { Observable } from 'rxjs';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
   public types: string[] = [];

   constructor(private storageService: StorageService,
               private store: Store<STORE_STATE>) { }

   ngOnInit() {
      this.storageService.getKeys().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types.splice(0, 4); // todo: that should be complexity calculation of popular types
      });
   }

   public updateType(type: string): void {
      this.store.dispatch({
         type: ActivityActionsKey.SET_TYPE,
         payload: {
            type
         }
      })
   }

   public getState$(): Observable<ActivityState> {
      return this.store.pipe(select(ACTIVITY_STATE_KEY));
   }

   public applyActivityType(target: ACTIVITY_STATUS, type?: string) {
      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            type
         }
      });
   }
}
