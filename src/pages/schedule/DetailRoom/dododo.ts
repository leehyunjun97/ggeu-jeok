import { updateDetailDateContentsApi } from '../../../services/room/room';
import { IDateDetail, IRoomInfo } from '../../../types/room';

export  const aa = async (
  list: IRoomInfo,
  filterId: number,
  assignObj: IDateDetail,
  isSuccessFn: () => void
) => {
  const otherData: IDateDetail[] = list.date.filter(
    (item) => item.id !== filterId
  );

  otherData.push(assignObj);

  const patchCom = await updateDetailDateContentsApi(list, otherData);

  if (patchCom.status === 200) {
    isSuccessFn();
  }
};
