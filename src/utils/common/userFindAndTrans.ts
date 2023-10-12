import { getLoginCheckApi } from '../../services/user/user';
import { IUserInfo } from '../../types/user';
import { objTransArr } from './objectTransformArray';

export const fromEmail = async (email: string) => {
  const data = await getLoginCheckApi(email);
  const sendUser: IUserInfo[] = objTransArr(data);

  if (!sendUser[0].friend) {
    sendUser[0] = { ...sendUser[0], friend: [] };
  }

  if (!sendUser[0].alarm) {
    sendUser[0] = { ...sendUser[0], alarm: [] };
  }

  return sendUser[0];
};
