import { IFriendInfo } from '../../types/friend';
import { IMemberInfo } from '../../types/room';
import { IUserInfo } from '../../types/user';

type TMemberClass = 'admin' | 'member';

export const defaultContent = () => {
  let content = {};
  for (let i = 0; i <= 24; i++) {
    content = { ...content, [`${i}시`]: `${i}시` };
  }

  return content;
};

export const createMemberInfoObj = (
  info: IUserInfo | IFriendInfo,
  memberClass: TMemberClass
) => {
  const { email, nickName, name, image, id } = info;
  const obj: IMemberInfo = {
    id,
    email,
    class: memberClass,
    nickName,
    name,
    image,
  };

  return obj;
};

export const defaultRoomInfo = () => {
  return {
    title: '',
    admin: '',
    location: '',
    member: [],
    date: [],
    talk: [],
  };
};
