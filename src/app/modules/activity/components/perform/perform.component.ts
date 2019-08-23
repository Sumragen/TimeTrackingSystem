import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivityActionsKey, ActivityState } from '../../../../shared/store/reducers/activity.reducer';
import { ACTIVITY_STATE_KEY } from '../../../../shared/store/store';
import { STORAGE_EFFECT } from '../../../../shared/store/effects/storage.effect';
import { Select } from '../../../../shared/store/decorators/select';
import { Dispatch } from '../../../../shared/store/decorators/dispatch';
import { TimeService } from '../../../../shared/services/time/time.service';

@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html',
  styleUrls: ['./perform.component.scss']
})
export class PerformComponent {
  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor() {}

  @Dispatch()
  public updateDescription(description: string) {
    return {
      type: ActivityActionsKey.SET_DESCRIPTION,
      payload: {
        description
      }
    };
  }

  @Dispatch()
  public completeActivity() {
    return {
      type: STORAGE_EFFECT.COMPLETE,
      payload: {
        target: {
          type: ActivityActionsKey.COMPLETE
        }
      }
    };
  }
}
