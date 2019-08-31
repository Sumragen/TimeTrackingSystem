import { Injectable } from '@angular/core';

import { Dispatch } from '../../../shared/store/decorators/dispatch';
import { STORAGE_EFFECT } from '../../../shared/store/effects/storage.effect';
import { ActionBuilder } from '../../../shared/store/action-builder';
import { HSLColor } from '../../../shared/models/colors.models';

@Injectable()
export class StatisticDispatch {
  @Dispatch()
  public updateType(type: string, color: HSLColor) {
    return ActionBuilder.payload(STORAGE_EFFECT.UPDATE_KEY, { type, color });
  }
}
