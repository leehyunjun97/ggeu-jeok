import { atom } from 'recoil';
import { IAlarm } from '../../types/alarm';

const alarms = atom<IAlarm[]>({
  key: 'alarms',
  default: [],
});
