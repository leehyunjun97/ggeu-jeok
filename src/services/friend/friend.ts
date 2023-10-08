import axios from 'axios';
// import { IUserInfo } from '../../types/user';
// import { postEmailCheckApi } from '../user/user';

// const getMyFriendsApi = async (email: string) => {
//   console.log(email);
//   try {
//     const getComplet = await postEmailCheckApi(email);
//     const myFriendsList = getComplet.data.alarm;
//     return myFriendsList;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// const addFriendApi = async (myInfo: IUserInfo, friend_email: string) => {
//   try {
//     const friendInfo = await postEmailCheckApi(friend_email);

//     const addFunc = async () => {
//       const a = await axios.patch(`http://localhost:4000/user/${myInfo.id}`, {
//         friend: [
//           ...myInfo.friend,
//           {
//             id: friendInfo.data.id,
//             email: friend_email,
//             nickName: friendInfo.data.nickName,
//             name: friendInfo.data.name,
//             image: friendInfo.data.image,
//           },
//         ],
//       });
//       await axios.patch(`http://localhost:4000/user/${friendInfo.id}`, {
//         friend: [
//           friendInfo.data.friend,
//           {
//             id: myInfo.id,
//             email: myInfo.email,
//             nickName: myInfo.nickName,
//             name: myInfo.name,
//             image: myInfo.image,
//           },
//         ],
//       });

//       return a;
//     };

//     return addFunc();
//   } catch (error) {}
// };

// export { getMyFriendsApi, addFriendApi };
