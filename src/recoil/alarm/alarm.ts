import { atom } from 'recoil';
import { IAlarm } from '../../types/alarm';

export const alarms = atom<IAlarm[]>({
  key: 'alarms',
  default: [],
});
