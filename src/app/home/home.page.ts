import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, takeUntil, tap } from 'rxjs/operators';

import { BUTTON_TYPE, ButtonState, STOP } from '../shared/store/reducers';
import { BUTTON_STATE_KEY, STORE_STATE } from '../shared/store/store';
import { StorageService } from '../shared/services/storage/storage.service';

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
   public button$: Observable<ButtonState>;
   public isInProgress$: Observable<boolean>;
   private destroyed$ = new Subject<boolean>();

   constructor(
      private store: Store<STORE_STATE>,
      private cdr: ChangeDetectorRef,
      private storageService: StorageService,
      private actions: Actions
   ) {}

   public ngOnInit() {
      this.button$ = this.store.pipe(
         takeUntil(this.destroyed$),
         select(BUTTON_STATE_KEY)
      );

      this.isInProgress$ = this.button$.pipe(
         map((button: ButtonState) => button.type === BUTTON_TYPE.STOP)
      );

      this.setupActivityTypes();
      this.actions.pipe(
         ofType(STOP),
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

   public buttonClick(target) {
      this.store.dispatch({
         type: 'record',
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
