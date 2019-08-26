import { Component, Input } from '@angular/core';

import { ActivityActionsKey, ActivityState } from '../../store/activity.reducer';
import { Dispatch } from '../../../../shared/store/decorators/dispatch';

@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html',
  styleUrls: ['./perform.component.scss']
})
export class PerformComponent {
  @Input() public state: ActivityState;

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
}
