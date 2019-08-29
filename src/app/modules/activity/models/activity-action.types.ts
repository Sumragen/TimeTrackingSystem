import { PayloadAction, PayloadTargetAction } from '../../../shared/store/store';
import { Activity } from './activity.types';

export type ApplyActivityAction = PayloadTargetAction<PayloadAction<Activity>>;
export type SwitchActivityAction = PayloadTargetAction<
  PayloadTargetAction<PayloadAction<Activity>>
>;
export type CompleteActivityAction = PayloadTargetAction<Activity>;
