export interface ActivityTypeButton {
  color: string;
  label: string;
}

export enum ACTIVITY_STATUS {
  IDLE = 'IDLE',
  PERFORM = 'PERFORM',
  COMPLETE = 'COMPLETE'
}

export interface ActivityTime {
  performedTime: number;
  date: number;
}

export interface Activity extends Partial<ActivityTime> {
  type: string;
  description?: string;
}