import { IFriendInfo } from './friend';

export type TMemberClass = 'admin' | 'member';

export interface IMemberInfo extends IFriendInfo {
  class: string;
}

export interface IDateDetailContent {
  id: number;
  hour: string;
  text: string;
}

export interface IDateDetail {
  id: number;
  dateDetail: string;
  subTitle: string;
  content: IDateDetailContent[];
}
export interface ITalk {
  message: string;
  nickName: string;
  date: string;
}

export interface IRoomInfo {
  uuid: string;
  title: string;
  admin: string;
  location: string;
  member: IMemberInfo[];
  date: IDateDetail[];
  talk: ITalk[];
  create_at?: Date;
  dDay?: Date;
}
