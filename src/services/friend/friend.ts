import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { firebaseUrl } from '../../constants/url/baseUrl';

const addFriendApi = async (myInfo: IUserInfo, friendInfo: IUserInfo) => {
  try {
    const fatchCom = await axios.patch(
      `${firebaseUrl}/user/${myInfo.uuid}.json`,
      {
        ...myInfo,
        friend: [
          ...myInfo.friend,
          {
            id: friendInfo.id,
            email: friendInfo.email,
            nickName: friendInfo.nickName,
            name: friendInfo.name,
            image: friendInfo.image,
          },
        ],
      }
    );
    return fatchCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { addFriendApi };
