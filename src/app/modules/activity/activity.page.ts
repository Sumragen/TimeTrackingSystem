import { Component, OnInit } from '@angular/core';

import { ActivityActionsKey, ActivityState } from '../../shared/store/reducers/activity.reducer';
import { StorageService } from '../../shared/services/storage/storage.service';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { StoreState, StoreAction } from '../../shared/store/store';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.setupInitialStoreState();
  }

  private setupInitialStoreState(): void {
    this.storageService.getSavedState().then((state: StoreState) => {
      if (!!state) {
        this.initialize(state);
      }
    });
  }

  @Dispatch()
  private initialize(state: StoreState): StoreAction {
    return {
      type: ActivityActionsKey.INITIALIZE,
      payload: state
    };
  }
}
