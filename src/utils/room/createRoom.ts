import { IFriendInfo } from '../../types/friend';
import { IMemberInfo, TMemberClass } from '../../types/room';
import { IUserInfo } from '../../types/user';

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
