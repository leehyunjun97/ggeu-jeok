import { atom } from 'recoil';

const myFriendsList = atom({
  key: 'myFriendsList',
  default: [],
});

export { myFriendsList };
