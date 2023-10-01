import { atom } from 'recoil';
import { IUserInfo } from '../../types/user';

const userInfo = atom<IUserInfo>({
  key: 'userInfo',
  default: {
    id: '',
    email: '',
    password: '',
    nickName: '',
    name: '',
    image: '',
    friend: [],
  },
});

const userRender = atom({
  key: 'userRender',
  default: false,
});

export { userInfo, userRender };
