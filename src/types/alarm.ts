// {
//   "id": 4,
//   "email": "song@naver.com",
//   "nickName": "song",
//   "message": "친구요청을 보냈습니다.",
//   "type": "friendRequest"
// }

export type alarmType = 'friendRequest' | 'friendRequestRefusal' | 'roomInvite';

export interface IAlarm {
  id: number;
  email: string;
  nickName: string;
  message: string;
  type: alarmType;
}
