import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { IAlarm, alarmMessageType, alarmType } from '../../types/alarm';
import { firebaseUrl } from '../../constants/url/baseUrl';

const myAlarmsApi = async (uuid: string) => {
  try {
    const getComplet = await axios.get(
      `${firebaseUrl}/user/${uuid}/alarm.json`
    );

    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const alarmPushApi = async (
  sender: IUserInfo,
  receiver: IUserInfo,
  message: alarmMessageType,
  type: alarmType
) => {
  try {
    const pushAlarm = async () => {
      const alarmPatchComplet = await axios.patch(
        `${firebaseUrl}/user/${receiver.uuid}.json`,
        {
          ...receiver,
          alarm: [
            ...receiver.alarm,
            {
              uuid: uuidv4(),
              email: sender.email,
              nickName: sender.nickName,
              message,
              type,
              create_at: new Date(),
            },
          ],
        }
      );
      return alarmPatchComplet;
    };

    return pushAlarm();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const removeAlarm = async (info: IUserInfo, alarms: IAlarm[]) => {
  try {
    const delCom = await axios.patch(`${firebaseUrl}/user/${info.uuid}.json`, {
      ...info,
      alarm: [...alarms],
    });
    return delCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { myAlarmsApi, alarmPushApi, removeAlarm };
