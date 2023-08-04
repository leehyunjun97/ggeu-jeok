import { atom } from 'recoil';
import { IRoomInfo } from '../../types/room';

const roomInfo = atom<IRoomInfo>({
  key: 'roomInfo',
  default: {
    id: '',
    title: '',
    admin: '',
    member: [],
    date: [],
  },
});

export { roomInfo };
