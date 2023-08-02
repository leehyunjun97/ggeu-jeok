// export interface IUserInfo {
//   id?: string;
//   email: string;
//   password: string;
//   nickName: string;
//   name: string;
//   friend: IFriendInfo[];
// }

import { IUserInfo } from "./user";

export interface IMemberInfo extends IUserInfo{
  
}

export interface IRoomInfo {
  id: string;
  title: string;
  member: IUserInfo[];
}

// "room": [
//   {
//     "id": 1,
//     "title": "오랜만에 놀러가요잉",
//     "member": [
//       {
//         "id": 1,
//         "userName": "이현준",
//         "userNickName": "monstamp",
//         "class": "admin"
//       },
//       {
//         "id": 4,
//         "userName": "어드민",
//         "userNickName": "ADMIN",
//         "class": "member"
//       }
//     ],
//     "date": [
//       {
//         "id": 1,
//         "dateDetail": "2023-08-02",
//         "subTite": ""
//       },
//       {
//         "id": 2,
//         "dateDetail": "2023-08-03",
//         "subTite": ""
//       }
//     ]
//   }
// ]