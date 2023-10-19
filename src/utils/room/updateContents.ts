import { IDateDetail, IDateDetailContent } from '../../types/room';

export const updateContents = (
  detailSchedule: IDateDetail,
  key: 'subTitle' | 'content',
  value: string | IDateDetailContent
) => {
  // const newDetail: IDateDetail = {
  //   ...detailSchedule,
  //   subTitle: newTitle,
  // };
  // // 지금 id 이외의 detailDate 리스트
  // const otherData: IDateDetail[] = roomInfo.date.filter(
  //   (item: IDateDetail) => item.id !== detailSchedule.id
  // );
  // otherData.push(newDetail);
};
