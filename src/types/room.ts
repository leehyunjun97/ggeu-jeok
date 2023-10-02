export interface IMemberInfo {
  id?: string;
  name: string;
  email: string;
  nickName: string;
  class: string;
  image: string;
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
