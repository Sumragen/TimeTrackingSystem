import { Component, OnInit, ViewChild } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { IonInput } from '@ionic/angular';

import { ActivityActionsKey, ActivityState } from './store/activity.reducer';
import { Dispatch } from '../../shared/store/decorators/dispatch';
import { ACTIVITY_STATE_KEY, PayloadAction, TargetAction } from '../../shared/store/store';
import { ActivityStorageService } from './services/activity-storage.service';
import { Select } from '../../shared/store/decorators/select';
import { Observable } from 'rxjs';
import { Activity, ACTIVITY_STATUS, ActivityTypeButton } from './models/activity.types';
import { STORAGE_EFFECT } from '../../shared/store/effects/storage.effect';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(private storageService: ActivityStorageService) {}

  ngOnInit(): void {
    this.setupInitialStoreState();
  }

  private setupInitialStoreState(): void {
    this.storageService
      .getSavedState()
      .pipe(
        tap(this.initialize)
        // tap(
        //   (state: ActivityState) =>
        //     (this.activityTypeVisibility = !state || !this.isPerform(state.status))
        // )
      )
      .subscribe();
  }

  public isPerform(status: ACTIVITY_STATUS): boolean {
    return status === ACTIVITY_STATUS.PERFORM;
  }

  @Dispatch()
  private initialize(state: ActivityState): PayloadAction<ActivityState> {
    return {
      type: ActivityActionsKey.INITIALIZE,
      payload: state
    };
  }
}
