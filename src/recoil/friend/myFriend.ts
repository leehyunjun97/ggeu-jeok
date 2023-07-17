import { atom } from 'recoil';
import { IFriendInfo } from '../../types/friend';

const myFriendsList = atom<IFriendInfo[]>({
  key: 'myFriendsList',
  default: [],
});

export { myFriendsList };
