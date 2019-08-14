import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, takeUntil, tap } from 'rxjs/operators';

import { APP_STATUS, AppState } from '../../shared/store/reducers/app.reducer';
import { APP_STATE_KEY, STORE_STATE } from '../../shared/store/store';
import { StorageService } from '../../shared/services/storage/storage.service';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';

// TODO: Temporary it will live there, but in future it will go to the separate component
// but
// need to clarify is't nice solution to move button and loading indicator to the separate component
export enum BUTTON_TYPE {
   START = 'start',
   STOP = 'stop'
}

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
   public description: string;
   public type: string;
   public customType: string;
   public customTypeChecked: boolean = false;
   public activityTypes: string[];
   public state$: Observable<AppState>;
   public isInProgress$: Observable<boolean>;
   private destroyed$ = new Subject<boolean>();

   constructor(
      private store: Store<STORE_STATE>,
      private cdr: ChangeDetectorRef,
      private storageService: StorageService,
      private actions: Actions
   ) {}

   public ngOnInit() {
      this.state$ = this.store.pipe(
         takeUntil(this.destroyed$),
         select(APP_STATE_KEY)
      );

      this.isInProgress$ = this.state$.pipe(
         map((appState: AppState) => appState.status === APP_STATUS.PERFORMING)
      );

      this.setupActivityTypes();
      this.actions.pipe(
         ofType(APP_STATUS.PERFORMING),
         takeUntil(this.destroyed$),
         tap(() => {
            this.setupActivityTypes();
            this.unselectCustomType();
            this.customType = null;
         })
      ).subscribe();
   }

   public ngOnDestroy() {
      this.destroyed$.next(true);
      this.destroyed$.complete();
   }

   public buttonClick(target: APP_STATUS) {
      this.store.dispatch({
         type: STORAGE_EFFECT.RECORD,
         payload: {
            target,
            description: this.description,
            type: this.type || this.customType
         }
      });
   }

   public selectNewActivityInput(): void {
      this.customTypeChecked = true;
      this.cdr.detectChanges();
   }

   public unselectCustomType(): void {
      this.customTypeChecked = false;
   }

   public isActivityTypeExist(): boolean {
      return !!this.activityTypes && this.activityTypes.length > 0
   }

   private setupActivityTypes(): void {
      this.storageService.getKeys().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.activityTypes = types;
         this.type = types[0];
      });
   }
}
