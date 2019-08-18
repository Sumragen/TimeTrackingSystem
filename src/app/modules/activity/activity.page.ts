import { Component, OnInit } from '@angular/core';
import { ActivityActionsKey, ActivityState } from '../../shared/store/reducers/activity.reducer';
import { StorageService } from '../../shared/services/storage/storage.service';
import { Store } from '@ngrx/store';
import { STORE_STATE } from '../../shared/store/store';

@Component({
   selector: 'app-activity',
   templateUrl: 'activity.page.html',
   styleUrls: ['activity.page.scss'],
})
export class ActivityPage implements OnInit {
   constructor(
      private storageService: StorageService,
      private store: Store<STORE_STATE>
   ) {}

   ngOnInit(): void {
      this.setupInitialStoreState();
   }

   private setupInitialStoreState(): void {
      this.storageService.getSavedState().then((state: ActivityState) => {
         if (!!state) {
            this.store.dispatch({
               type: ActivityActionsKey.INITIALIZE,
               payload: state
            })
         }
      })
   }
}
