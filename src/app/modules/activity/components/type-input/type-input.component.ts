import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ActivityService } from '../../services/activity.service';
import { ACTIVITY_STATE_KEY } from '../../../../shared/store/store';
import { ActivityActionsKey, ActivityState } from '../../store/activity.reducer';
import { Select } from '../../../../shared/store/decorators/select';
import { Dispatch } from '../../../../shared/store/decorators/dispatch';
import { ActivityTypeButton } from '../../models/activity.types';

@Component({
  selector: 'app-type-input',
  templateUrl: './type-input.component.html',
  styleUrls: ['./type-input.component.scss']
})
export class TypeInputComponent implements OnInit {
  public types$: Observable<ActivityTypeButton[]>;
  public typeInputVisible: boolean = true;

  @Output() public typeSelect: EventEmitter<string> = new EventEmitter<string>();

  @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.types$ = this.activityService
      .getCurrentTypes()
      .pipe(tap((types: ActivityTypeButton[]) => (this.typeInputVisible = types.length <= 4)));
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

  public sliced(types: ActivityTypeButton[]): ActivityTypeButton[] {
    return types.slice(0, 4);
  }

  public selectType(type: string) {
    this.typeSelect.emit(type);
  }

  public defineClass(typesAmount: number): string {
    if (typesAmount <= 4) {
      return 'fullwidth-line-wrapper';
    } else {
      return 'overloaded-activities-wrapper';
    }
  }

  public toggleInputView(): void {
    this.typeInputVisible = !this.typeInputVisible;
  }
}
