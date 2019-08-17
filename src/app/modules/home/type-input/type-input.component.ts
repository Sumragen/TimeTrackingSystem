import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActivityService } from '../../../shared/services/activity/activity.service';
import { ACTIVITY_STATE_KEY, STORE_STATE } from '../../../shared/store/store';
import { ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';

@Component({
   selector: 'app-type-input',
   templateUrl: './type-input.component.html',
   styleUrls: ['./type-input.component.scss'],
})
export class TypeInputComponent implements OnInit {

   public types: string[];
   @Output() public onTypeSelect: EventEmitter<string> = new EventEmitter<string>();

   constructor(private activityService: ActivityService,
               private store: Store<STORE_STATE>) { }

   ngOnInit() {
      this.activityService.getCurrentTypes().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types;
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

   public selectType(type: string) {
      this.onTypeSelect.emit(type);
   }
}
