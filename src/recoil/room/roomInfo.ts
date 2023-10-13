import { atom } from 'recoil';
import { IDateDetail, IRoomInfo } from '../../types/room';

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

export { roomInfo, detailScheduleInfo };
