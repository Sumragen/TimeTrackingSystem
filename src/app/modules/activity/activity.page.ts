import { Component, OnInit } from '@angular/core';

import { ActivityActionsKey } from './store/activity.reducer';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { StoreAction, StoreState } from '../../shared/store/store';
import { ActivityStorageService } from './services/activity-storage.service';
import { tap } from 'rxjs/operators';

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
    this.storageService.getSavedState().pipe(
       tap(this.initialize)
    ).subscribe();
  }

  @Dispatch()
  private initialize(state: StoreState): StoreAction {
    return {
      type: ActivityActionsKey.INITIALIZE,
      payload: state
    };
  }
}
