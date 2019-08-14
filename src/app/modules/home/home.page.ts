import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';

import { APP_STATUS, AppState } from '../../shared/store/reducers/app.reducer';
import { APP_STATE_KEY, STORE_STATE } from '../../shared/store/store';
import { StorageService } from '../../shared/services/storage/storage.service';
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
}

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage extends DestroyComponent implements OnInit {
   public description: string;
   public type: string;
   public record: RecordInterface = {
      type: null
   };
   public customTypeChecked: boolean = false;
   public activityTypes: string[];
   public state$: Observable<AppState>;
   public isInProgress$: Observable<boolean>;

   constructor(
      private store: Store<STORE_STATE>,
      private cdr: ChangeDetectorRef,
      private storageService: StorageService,
      private actions: Actions
   ) {
      super();
   }

   public ngOnInit() {
      this.state$ = this.setupStateObs();
      this.isInProgress$ = this.setupInProgressObs();

      this.watchPerformAction();
   }


   public buttonClick(target: APP_STATUS) {
      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            description: this.description,
            type: this.record.type
         }
      });
   }

   public selectNewActivityInput(): void {
      this.customTypeChecked = true;
      this.cdr.detectChanges();
   }

   public cleanCustomTypeRadio(): void {
      this.customTypeChecked = false;
   }

   public isActivityTypeExist(): boolean {
      return !!this.activityTypes && this.activityTypes.length > 0
   }

   public isInIdle(status: APP_STATUS): boolean {
      return status === APP_STATUS.IDLE;
   }

   public isInPerform(status: APP_STATUS): boolean {
      return status === APP_STATUS.PERFORM;
   }

   //encapsulated logic =================================================================
   private refreshActivityTypes(): Promise<void> {
      return this.storageService.getKeys().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.activityTypes = types;
      });
   }


   private setupStateObs(): Observable<AppState> {
      return this.store.pipe(select(APP_STATE_KEY));
   }

   private setupInProgressObs(): Observable<boolean> {
      return this.state$.pipe(
         map((appState: AppState) => appState.status === APP_STATUS.PERFORM)
      );
   }

   private watchPerformAction(): void {
      const performAction$ = this.setupPerformActionSub();
      performAction$.pipe(
         startWith(null),
         takeUntil(this.dispose$),
         tap(async () => {
            await this.refreshActivityTypes();
            // this.setMostPopularActivityType();
            this.cleanCustomTypeRadio();
         })
      ).subscribe();
   }

   private setupPerformActionSub(): Observable<void> {
      return this.actions.pipe(
         ofType(APP_STATUS.PERFORM)
      );
   }

   private setMostPopularActivityType(): void {
      if (!!this.activityTypes && this.activityTypes.length > 0) {
         this.type = this.activityTypes[0];
      }
   }
}
