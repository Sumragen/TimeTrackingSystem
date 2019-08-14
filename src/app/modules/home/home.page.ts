import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_STATUS, AppState } from '../../shared/store/reducers/app.reducer';
import { APP_STATE_KEY, STORE_STATE } from '../../shared/store/store';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { DestroyComponent } from '../../shared/components/destroy/destroy.component';

// TODO: Temporary it will live there, but in future it will go to the separate component
// but
// need to clarify is't nice solution to move button and loading indicator to the separate component
export enum BUTTON_TYPE {
   START = 'start',
   STOP = 'stop'
}

export interface RecordInterface {
   type: string;
   description?: string;
}

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage extends DestroyComponent implements OnInit {
   public record: RecordInterface = {
      type: null
   };
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
   }


   public buttonClick(target: APP_STATUS) {
      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            ...this.record
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
}
