import { atom } from 'recoil';
import { IDateDetail, IMemberInfo, IRoomInfo } from '../../types/room';

const roomInfo = atom<IRoomInfo>({
  key: 'roomInfo',
  default: {
    uuid: '',
    title: '',
    admin: '',
    location: '',
    member: [],
    date: [],
    talk: [],
  },
});

const detailScheduleInfo = atom<IDateDetail>({
  key: 'detailScheduleInfo',
  default: {
    id: 0,
    dateDetail: '',
    subTitle: '',
    content: {},
  },
});

const myRoomProfile = atom<IMemberInfo>({
  key: 'myRoomProfile',
  default: {
    class: '',
    id: '',
    email: '',
    nickName: '',
    name: '',
    image: '',
  },
});

export { roomInfo, detailScheduleInfo, myRoomProfile };
