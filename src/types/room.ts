export interface IMemberInfo {
  id: string;
  name: string;
  email: string;
  nickName: string;
  class: string;
}

export interface IDateDetail {
  id: string;
  dateDetail: string;
  subTitle: string;
}

export interface IRoomInfo {
  id: string;
  title: string;
  admin: string;
  member: IMemberInfo[];
  date: IDateDetail[];
}
