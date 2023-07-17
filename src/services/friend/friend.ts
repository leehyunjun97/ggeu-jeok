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

const addFriendApi = async (my_email: string, friend_email: string) => {
  try {
    const myInfo = await postEmailCheckApi(my_email);
    const friendInfo = await postEmailCheckApi(friend_email);

    const addFunc = async () => {
      await axios.patch(`http://localhost:4000/user/${myInfo.id}`, {
        friend: [
          ...myInfo.friend,
          {
            email: friend_email,
            nickName: friendInfo.nickName,
            name: friendInfo.name,
          },
        ],
      });
      await axios.patch(`http://localhost:4000/user/${friendInfo.id}`, {
        friend: [
          ...friendInfo.friend,
          {
            email: my_email,
            nickName: myInfo.nickName,
            name: myInfo.name,
          },
        ],
      });
    };

    addFunc();
  } catch (error) {}
};

export { getMyFriendsApi, addFriendApi };
