export interface IMemberInfo {
  id: string;
  userName: string;
  userNickName: string;
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
  member: IMemberInfo[];
  date: IDateDetail[];
}
