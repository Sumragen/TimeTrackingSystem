import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { equals } from 'ramda';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { DestroyComponent } from '../../shared/components/destroy/destroy.component';
import { ACTIVITY_STATE_KEY } from '../../shared/store/store';
import { Select } from '../../shared/store/decorators/select';

import { ActivityState } from './store/activity.reducer';
import { ActivityStorageService } from './services/activity-storage.service';
import { ACTIVITY_STATUS } from './models/activity.types';
import { ActivityDispatch } from './store/activity.dispatch';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { NotificationBuilder } from '../../shared/services/notification/notification-builder';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage extends DestroyComponent implements OnInit {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(
    private storageService: ActivityStorageService,
    private activityDispatch: ActivityDispatch,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupInitialStoreState();
    // TODO: it's a temporary part for testing reason
    const options = NotificationBuilder.create({
      title: 'Switch activity',
      text: 'It\'s look like a great moment to switch your activity',
      badge: 3,
      vibrate: true,
      led: '#F16E0C',
      foreground: true,
      actions: [{ id: 'switchTo', title: 'Smoke' }],
      trigger: {
        at: new Date(new Date().getTime() + 1000 * 20)
      }
    });
    this.notificationService.schedule(options);
    this.notificationService.on('switchTo').subscribe(() => {
      this.activityDispatch.switchActivity('Smoke')
    });
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
