import { getLoginCheckApi } from '../../services/user/user';
import { IUserInfo } from '../../types/user';
import { objUuidAdd } from './objectTransformArray';

export const fromEmail = async (email: string) => {
  const data = await getLoginCheckApi(email);
  const sendUser: IUserInfo = objUuidAdd(data);

  if (!sendUser.friend) {
    sendUser.friend = [];
  }

  if (!sendUser.alarm) {
    sendUser.alarm = [];
  }

  return sendUser;
};
