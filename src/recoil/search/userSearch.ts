import { atom } from 'recoil';

const userSearch = atom({
  key: '#userSearch',
  default: '',
});

export { userSearch };
