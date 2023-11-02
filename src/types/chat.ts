export interface IChat {
  id?: string;
  user_uuid: string;
  nickName: string;
  image: string;
  text: string;
  sentAt: Date;
}
