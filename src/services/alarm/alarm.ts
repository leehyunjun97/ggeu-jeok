import axios from 'axios';
import { IUserInfo } from '../../types/user';
// import { postEmailCheckApi } from '../user/user';

const myAlarmsApi = async (uuid: string) => {
  try {
    const getComplet = await axios.get(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${uuid}/alarm.json`
    );

    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const friendRequestApi = async (sender: IUserInfo, receiver: IUserInfo) => {
  try {
    const addFriendAlarm = async () => {
      if (receiver.alarmIndex === 0) {
        receiver.alarm = [];
      }

      const patchComplet = await axios.patch(
        `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${receiver.uuid}.json`,
        {
          ...receiver,
          alarmIndex: (receiver.alarmIndex += 1),
          alarm: [
            ...receiver.alarm,
            {
              id: receiver.alarmIndex,
              email: sender.email,
              nickName: sender.nickName,
              message: '친구요청을 보냈습니다.',
              type: 'friendRequest',
            },
          ],
        }
      );
      return patchComplet;
    };

    return addFriendAlarm();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const removeAlarm = async (alarmId : number) => {
  try {
    const delCom = await axios.delete
  } catch (error:any) {
    throw new Error(error.message);
    
  }
}

// const friendRequestRefusalApi = async (sender: string, receiver: string) => {
//   try {
//     const senderInfo = await postEmailCheckApi(sender);
//     const receiverInfo = await postEmailCheckApi(receiver);

//     const addFriendAlarm = async () => {
//       const postComplet = await axios.patch(
//         `http://localhost:4000/user/${receiverInfo.id}`,
//         {
//           alarm: [
//             ...receiverInfo.alarm,
//             {
//               id: receiverInfo.alarmIndex,
//               email: senderInfo.email,
//               nickName: senderInfo.nickName,
//               message: '친구요청을 거절하였습니다.',
//               type: 'friendRequestRefusal',
//             },
//           ],
//           alarmIndex: (receiverInfo.alarmIndex += 1),
//         }
//       );
//       return postComplet;
//     };

//     return addFriendAlarm();
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export {
  myAlarmsApi,
  friendRequestApi,
  // friendRequestRefusalApi,
  removeAlarm,
  // friendRequestCheckApi,
};
