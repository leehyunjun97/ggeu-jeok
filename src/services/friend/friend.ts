import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { getMyInfoApi, getUsersApi, postEmailCheckApi } from '../user/user';

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
  console.log(email);
  try {
    const getComplet = await postEmailCheckApi(email);
    const myFriendsList = getComplet.friend;
    return myFriendsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addFriendApi = async (myInfo: IUserInfo, friend_email: string) => {
  try {
    // const myInfo = await postEmailCheckApi(my_email);
    const friendInfo = await postEmailCheckApi(friend_email);

    // const myInfo = await getMyInfoApi(my_email);

    const addFunc = async () => {
      const a = await axios.patch(`http://localhost:4000/user/${myInfo.id}`, {
        friend: [
          ...myInfo.friend,
          {
            id: friendInfo.id,
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
            id: myInfo.id,
            email: myInfo.email,
            nickName: myInfo.nickName,
            name: myInfo.name,
          },
        ],
      });

      return a;
    };

    return addFunc();
  } catch (error) {}
};

export { getMyFriendsApi, addFriendApi };
