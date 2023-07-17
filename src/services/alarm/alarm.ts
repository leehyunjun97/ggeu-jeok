import axios from 'axios';
import { postEmailCheckApi } from '../user/user';

const getAlarmApi = async () => {
  try {
    const getComplet = await axios.get('http://localhost:4000/alarm');
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const myAlarmApi = async (email: string) => {
  try {
    const getComplet = await postEmailCheckApi(email);
    const myAlarmList = getComplet.alarm;
    console.log(getComplet);
    return myAlarmList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// const getMyFriendsApi = async (email: string) => {
//   try {
//     const getComplet = await postEmailCheckApi(email);
//     const myFriendsList = getComplet.friend;
//     return myFriendsList;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

const friendRequestApi = async (
  sender: string | undefined,
  receiver: string
) => {
  try {
    const postComplet = await axios.post('http://localhost:4000/alarm', {
      type: 'friend request',
      data: {
        sender,
        receiver,
      },
      message: {
        text: '친구 요청을 보냈습니다.',
      },
    });
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// const removeAlarm = async (id: string) => {
//   try {
//     await axios.delete(`http://localhost:4000/alarm/${id}`);
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export { getAlarmApi, myAlarmApi, friendRequestApi};
