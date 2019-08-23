import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ActivityService,
  ActivityTypeButton
} from '../../services/activity.service';
import { ACTIVITY_STATE_KEY } from '../../../../shared/store/store';
import { ActivityActionsKey, ActivityState } from '../../../../shared/store/reducers/activity.reducer';
import { Select } from '../../../../shared/store/decorators/select';
import { Dispatch } from '../../../../shared/store/decorators/dispatch';

@Component({
  selector: 'app-type-input',
  templateUrl: './type-input.component.html',
  styleUrls: ['./type-input.component.scss']
})
export class TypeInputComponent implements OnInit {
  public types$: Observable<ActivityTypeButton[]>;
  @Output() public typeSelect: EventEmitter<string> = new EventEmitter<string>();

  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.types$ = this.activityService.getCurrentTypes();
  }

  @Dispatch()
  public updateType(type: string) {
    return {
      type: ActivityActionsKey.SET_TYPE,
      payload: {
        type
      }
    };
  }

  public selectType(type: string) {
    this.typeSelect.emit(type);
  }
}
