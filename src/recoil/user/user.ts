import { atom } from 'recoil';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    user_id: '',
    email: '',
    password: '',
    nickName: '',
    name: '',
  },
});
