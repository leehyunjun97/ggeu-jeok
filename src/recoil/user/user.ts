import { atom } from 'recoil';
import { IUserInfo } from '../../types/user';

const userInfo = atom<IUserInfo>({
  key: 'userInfo',
  default: {
    id: '',
    uuid: '',
    email: '',
    password: '',
    nickName: '',
    name: '',
    image: '',
    friend: [],
    alarm: [],
    alarmIndex: 0,
  },
});

const userRender = atom({
  key: 'userRender',
  default: false,
});

export { userInfo, userRender };
