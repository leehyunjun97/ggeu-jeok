import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { getUsersApi, postEmailCheckApi } from '../user/user';

// const postAddFriendApi = async (
//   my_email: string | undefined,
//   friend_email: string
// ) => {
//   try {
//     const postComplet = await axios.post('http://localhost:4000/friends', {
//       my_email,
//       friend_email,
//     });
//     return postComplet;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

const getMyFriendsApi = async (email: string) => {
  try {
    const getComplet = await postEmailCheckApi(email);
    const myFriendsList = getComplet.friend;
    return myFriendsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getMyFriendsApi };
