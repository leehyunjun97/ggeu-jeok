import { IAlarm } from './alarm';
import { IFriendInfo } from './friend';

export interface IUserInfo {
  id: string;
  uuid: string;
  email: string;
  password: string;
  nickName: string;
  name: string;
  image: string;
  friend: IFriendInfo[];
  alarm: IAlarm[];
}

export interface IEmail {
  email: string;
}
