import { IFriendInfo } from './friend';

export interface IUserInfo {
  id?: string;
  email: string;
  password: string;
  nickName: string;
  name: string;
  friend: IFriendInfo[];
}

export interface IEmail {
  email: string;
}
