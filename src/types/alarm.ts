export type alarmType = 'friendRequest' | 'friendRequestRefusal';

export interface IAlarm {
  uuid: string;
  email: string;
  nickName: string;
  message: string;
  type: alarmType;
  create_at: Date;
}
