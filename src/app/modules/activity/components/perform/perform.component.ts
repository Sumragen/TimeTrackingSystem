import { Component, Input } from '@angular/core';

import { ActivityState } from '../../store/activity.reducer';
import { ActivityDispatch } from '../../store/activity.dispatch';

@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html',
  styleUrls: ['./perform.component.scss']
})
export class PerformComponent {
  @Input() public state: ActivityState;

  constructor(private activityDispatch: ActivityDispatch) {}

  updateDescription(description: string): void {
    this.activityDispatch.updateDescription(description);
  }
}
