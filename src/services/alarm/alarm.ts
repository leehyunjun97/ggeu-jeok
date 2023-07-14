import axios from 'axios';

const getAlarmApi = async () => {
  try {
    const getComplet = await axios.get('http://localhost:4000/alarm');
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postMyAlarmApi = async (email: string) => {
  try {
    const getAlarmList = await getAlarmApi();
    const myAlarm = getAlarmList.filter(
      (item: any) => item.data.receiver === email
    );

    if (Array.isArray(myAlarm)) {
      return myAlarm;
    } else {
      console.log('없어 이 스끼야');
      return [];
    }
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

export { getAlarmApi, postMyAlarmApi, friendRequestApi };
