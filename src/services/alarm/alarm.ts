import axios from 'axios';
import { postEmailCheckApi } from '../user/user';

const myAlarmApi = async (email: string) => {
  try {
    const getComplet = await postEmailCheckApi(email);
    const myAlarmList = getComplet.alarm;
    return myAlarmList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const friendRequestApi = async (sender: string, receiver: string) => {
  try {
    const senderInfo = await postEmailCheckApi(sender);
    const receiverInfo = await postEmailCheckApi(receiver);

    console.log(senderInfo);

    const addFriendAlarm = async () => {
      const postComplet = await axios.patch(
        `http://localhost:4000/user/${receiverInfo.id}`,
        {
          alarm: [
            ...receiverInfo.alarm,
            {
              id: receiverInfo.alarmIndex,
              email: senderInfo.email,
              nickName: senderInfo.nickName,
              message: '친구요청을 보냈습니다.',
            },
          ],
          alarmIndex: (receiverInfo.alarmIndex += 1),
        }
      );
      return postComplet;
    };

    return addFriendAlarm();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const removeAlarm = async (email: string, id: string) => {
  try {
    const myInfo = await postEmailCheckApi(email);

    const removeList = myInfo.alarm.filter((item: any) => item.id !== id);

    await axios.patch(`http://localhost:4000/user/${myInfo.id}`, {
      alarm: removeList,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { myAlarmApi, friendRequestApi, removeAlarm };
