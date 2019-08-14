import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_STATUS, AppState } from '../../shared/store/reducers/app.reducer';
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
   public state$: Observable<AppState>;
   public isInProgress$: Observable<boolean>;

   constructor(
      private store: Store<STORE_STATE>
   ) {
      super();
   }

   public ngOnInit() {
      this.state$ = this.setupStateObs();
      this.isInProgress$ = this.setupInProgressObs();

      this.cleanRecord();
   }

   public buttonClick(target: APP_STATUS) {
      const payload = {...this.record};

      if (target === APP_STATUS.PERFORM) {
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

   public isInIdle(status: APP_STATUS): boolean {
      return status === APP_STATUS.IDLE;
   }

   public isInPerform(status: APP_STATUS): boolean {
      return status === APP_STATUS.PERFORM;
   }

   //encapsulated logic =================================================================
   private setupStateObs(): Observable<AppState> {
      return this.store.pipe(select(APP_STATE_KEY));
   }

   private setupInProgressObs(): Observable<boolean> {
      return this.state$.pipe(
         map((appState: AppState) => appState.status === APP_STATUS.PERFORM)
      );
   }

   private cleanRecord(): void {
      this.record = {
         type: null,
         description: null
      };
   }
}