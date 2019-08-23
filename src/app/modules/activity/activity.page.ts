import { Component, OnInit } from '@angular/core';

import { ActivityActionsKey } from '../../shared/store/reducers/activity.reducer';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { StoreAction, StoreState } from '../../shared/store/store';
import { ActivityStorageService } from './services/activity-storage.service';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  constructor(private storageService: ActivityStorageService) {}

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
