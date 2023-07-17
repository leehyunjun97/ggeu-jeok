import axios from 'axios';
import { postEmailCheckApi } from '../user/user';

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
