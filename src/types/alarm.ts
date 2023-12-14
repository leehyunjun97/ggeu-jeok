export type alarmType = 'friendRequest' | 'friendRequestRefusal' | 'invite';
export type alarmMessageType =
  | '친구요청을 보냈습니다.'
  | '친구요청을 거절했습니다.'
  | '방에 초대 하셨습니다.';

export interface IAlarm {
  uuid: string;
  email: string;
  nickName: string;
  message: string;
  type: alarmType;
  create_at: Date;
}
