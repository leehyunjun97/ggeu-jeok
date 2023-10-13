import { IFriendInfo } from './friend';

export interface IMemberInfo extends IFriendInfo {
  class: string;
}

export interface IDateDetailContent {
  [key: string]: string | undefined;
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string;
  seven?: string;
  aight?: string;
  nine?: string;
  ten?: string;
  eleven?: string;
  twelve?: string;
}

export interface IDateDetail {
  id: number;
  dateDetail: string;
  subTitle: string;
  content: IDateDetailContent;
}
export interface ITalk {
  message: string;
  nickName: string;
  date: string;
}

export interface IRoomInfo {
  id?: string;
  title: string;
  admin: string;
  location: string;
  member: IMemberInfo[];
  date: IDateDetail[];
  talk: ITalk[];
  create_at?: Date;
  dDay? : Date;
}
