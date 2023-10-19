import { IFriendInfo } from './friend';

export type TMemberClass = 'admin' | 'member';

export interface IMemberInfo extends IFriendInfo {
  class: string;
}

export interface IDateDetailContent {
  [key: string]: string | undefined;
  '0시'?: string;
  '1시'?: string;
  '2시'?: string;
  '3시'?: string;
  '4시'?: string;
  '5시'?: string;
  '6시'?: string;
  '7시'?: string;
  '8시'?: string;
  '9시'?: string;
  '10시'?: string;
  '11시'?: string;
  '12시'?: string;
  '13시'?: string;
  '14시'?: string;
  '15시'?: string;
  '16시'?: string;
  '17시'?: string;
  '18시'?: string;
  '19시'?: string;
  '20시'?: string;
  '21시'?: string;
  '22시'?: string;
  '23시'?: string;
  '24시'?: string;
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
