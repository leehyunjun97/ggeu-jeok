import { updateDetailDateContentsApi } from '../../services/room/room';
import { IDateDetail, IDateDetailContent, IRoomInfo } from '../../types/room';

export const updateState = (
  data: IDateDetailContent[],
  item: IDateDetailContent,
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => {
  const itemIndex = data.findIndex((it) => it.hour === item.hour);

  const updateData = { ...data[itemIndex] };
  updateData.text = e.target.value;

  const otherData = [...data];
  otherData[itemIndex] = updateData;

  return otherData.sort((a, b) => a.id - b.id);
};

export const updateContents = (
  newContent: IDateDetailContent,
  detailSchedule: IDateDetail
) => {
  const orderContents: IDateDetailContent[] = detailSchedule.content.filter(
    (item) => item.hour !== newContent.hour
  );

  orderContents.push(newContent);

  return orderContents.sort((a, b) => a.id - b.id);
};

export const updateContentsFunc = async (
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
