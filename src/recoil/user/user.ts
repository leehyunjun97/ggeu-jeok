import { atom } from 'recoil';

const userInfo = atom({
  key: 'userInfo',
  default: {
    id: '',
    email: '',
    password: '',
    nickName: '',
    name: '',
  },
});

export { userInfo };
