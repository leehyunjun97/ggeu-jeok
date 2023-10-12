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
      const patchComplet = await axios.patch(
        `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${receiver.uuid}.json`,
        {
          ...receiver,
          alarm: [
            ...receiver.alarm,
            {
              email: sender.email,
              nickName: sender.nickName,
              message: '친구요청을 보냈습니다.',
              type: 'friendRequest',
              create_at: new Date(),
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

const friendRequestApi2 = async (sender: IUserInfo, receiver: IUserInfo) => {
  try {
    const addFriendAlarm = async () => {
      const patchComplet = await axios.patch(
        `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${receiver.uuid}.json`,
        {
          ...receiver,
          alarm: [
            ...receiver.alarm,
            {
              email: sender.email,
              nickName: sender.nickName,
              message: '친구요청을 보냈습니다.',
              type: 'friendRequest',
              create_at: new Date(),
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

const friendRequestRefusalApi = async (
  sender: IUserInfo,
  receiver: IUserInfo
) => {
  try {
    const addFriendAlarm = async () => {
      const postComplet = await axios.patch(
        `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${receiver.uuid}.json`,
        {
          ...receiver,
          alarm: [
            ...receiver.alarm,
            {
              email: sender.email,
              nickName: sender.nickName,
              message: '친구요청을 거절하였습니다.',
              type: 'friendRequestRefusal',
              create_at: new Date(),
            },
          ],
        }
      );
      return postComplet;
    };

    return addFriendAlarm();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const removeAlarm = async (info_uuid: string, alarm_uuid: string) => {
  try {
    const delCom = await axios.delete(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${info_uuid}/alarm/${alarm_uuid}.json`
    );
    return delCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  myAlarmsApi,
  friendRequestApi,
  friendRequestRefusalApi,
  removeAlarm,
  // friendRequestCheckApi,
};
