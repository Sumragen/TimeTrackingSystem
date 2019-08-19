import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivityService } from '../../../shared/services/activity/activity.service';
import { ACTIVITY_STATE_KEY } from '../../../shared/store/store';
import { ActivityActionsKey, ActivityState } from '../../../shared/store/reducers/activity.reducer';
import { Select } from '../../../shared/store/decorators/select';
import { Dispatch } from '../../../shared/store/decorators/dispatch';

@Component({
   selector: 'app-type-input',
   templateUrl: './type-input.component.html',
   styleUrls: ['./type-input.component.scss'],
})
export class TypeInputComponent implements OnInit {

   public types: string[];
   @Output() public onTypeSelect: EventEmitter<string> = new EventEmitter<string>();

   @Select(ACTIVITY_STATE_KEY) public state$: Observable<ActivityState>;

   constructor(private activityService: ActivityService) { }

   ngOnInit() {
      this.activityService.getCurrentTypes().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types;
      });
   }

   @Dispatch()
   public updateType(type: string) {
      return {
         type: ActivityActionsKey.SET_TYPE,
         payload: {
            type
         }
      }
   }

   public selectType(type: string) {
      this.onTypeSelect.emit(type);
   }
}
