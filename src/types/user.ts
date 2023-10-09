import { IFriendInfo } from './friend';

export interface IUserInfo {
  id?: string;
  uuid?: string;
  email: string;
  password: string;
  nickName: string;
  name: string;
  image: string;
  friend?: IFriendInfo[];
}

export interface IEmail {
  email: string;
}
