import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ACTIVITY_STATUS, ActivityState } from '../../shared/store/reducers/activity.reducer';
import { APP_STATE_KEY, STORE_STATE } from '../../shared/store/store';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { DestroyComponent } from '../../shared/components/destroy/destroy.component';
import { RecordInterface } from '../../shared/models/record';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage extends DestroyComponent implements OnInit {
   public record: RecordInterface;

   constructor(
      private store: Store<STORE_STATE>
   ) {
      super();
   }

   public ngOnInit() {
      this.cleanRecord();
   }

   public buttonClick(target: ACTIVITY_STATUS) {
      const payload = {...this.record};

      if (target === ACTIVITY_STATUS.PERFORM) {
         this.cleanRecord();
      }

      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            ...payload
         }
      });
   }

   public isInIdle(status: ACTIVITY_STATUS): boolean {
      return status === ACTIVITY_STATUS.IDLE;
   }

   public isInPerform(status: ACTIVITY_STATUS): boolean {
      return status === ACTIVITY_STATUS.PERFORM;
   }

   public getState$(): Observable<ActivityState> {
      return this.store.pipe(select(APP_STATE_KEY));
   }

   private cleanRecord(): void {
      this.record = {
         type: null,
         description: null
      };
   }
}
