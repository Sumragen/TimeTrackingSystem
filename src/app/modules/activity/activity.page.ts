import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { equals } from 'ramda';

import { DestroyComponent } from '../../shared/components/destroy/destroy.component';
import { ACTIVITY_STATE_KEY } from '../../shared/store/store';
import { Select } from '../../shared/store/decorators/select';

import { ActivityState } from './store/activity.reducer';
import { ActivityStorageService } from './services/activity-storage.service';
import { ACTIVITY_STATUS } from './models/activity.types';
import { ActivityDispatch } from './store/activity.dispatch';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage extends DestroyComponent implements OnInit {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(
    private storageService: ActivityStorageService,
    private activityDispatch: ActivityDispatch
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupInitialStoreState();
  }

  private setupInitialStoreState(): void {
    this.storageService
      .getSavedState()
      .pipe(
        takeUntil(this.dispose$),
        tap(this.activityDispatch.initialize)
      )
      .subscribe();
  }

  public isPerform = equals(ACTIVITY_STATUS.PERFORM);
}
