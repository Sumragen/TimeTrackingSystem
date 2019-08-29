import { Injectable } from '@angular/core';
import { PayloadAction, PayloadTargetAction } from './store';

@Injectable()
export class ActionBuilder {
  public static payload<T>(type: string, payload: T): PayloadAction<T> {
    return {
      type,
      payload
    };
  }
  public static payloadTarget<T>(type: string, target: T): PayloadTargetAction<T> {
    return ActionBuilder.payload(type, {
      target
    });
  }
}