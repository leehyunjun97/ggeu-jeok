import { IFriendInfo } from './friend';

export interface IMemberInfo extends IFriendInfo {
  class: string;
}

export interface IDateDetail {
  id: string;
  dateDetail: string;
  subTitle: string;
}

export interface IRoomInfo {
  id?: string;
  title: string;
  admin: string;
  location: string;
  member: IMemberInfo[];
  date: IDateDetail[];
}
