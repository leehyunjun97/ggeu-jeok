import { IFriendInfo } from './friend';

export interface IMemberInfo extends IFriendInfo {
  class: string;
}

export interface IDateDetailContent {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
}

export interface IDateDetail {
  dateDetail: string;
  subTitle: string;
  content: IDateDetailContent;
}

export interface IRoomInfo {
  id?: string;
  title: string;
  admin: string;
  location: string;
  member: IMemberInfo[];
  date: IDateDetail[];
}
