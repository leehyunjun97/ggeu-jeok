import axios from 'axios';
import { IUserInfo } from '../../types/user';

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

const addFriendApi = async (myInfo: IUserInfo, friendInfo: IUserInfo) => {
  try {
    await axios.patch(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${myInfo.uuid}.json`,
      {
        ...myInfo,
        friend: [
          ...myInfo.friend,
          {
            id: friendInfo.id,
            email: friendInfo.email,
            nickName: friendInfo.nickName,
            name: friendInfo.name,
            image: friendInfo.image,
          },
        ],
      }
    );
    await axios.patch(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${friendInfo.uuid}.json`,
      {
        ...friendInfo,
        friend: [
          ...friendInfo.friend,
          {
            id: myInfo.id,
            email: myInfo.email,
            nickName: myInfo.nickName,
            name: myInfo.name,
            image: myInfo.image,
          },
        ],
      }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { addFriendApi };
