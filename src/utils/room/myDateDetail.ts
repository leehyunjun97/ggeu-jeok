import { getMyDateDetailInfoApi } from '../../services/room/room';
import { IDateDetail } from '../../types/room';

export const getDetailInfoApi = async (
  room_uuid: string,
  detailDatePath: string
) => {
  try {
    const getComplet = await getMyDateDetailInfoApi(room_uuid, detailDatePath);
    const key = Object.keys(getComplet);
    const data: IDateDetail = getComplet?.[`${key[0]}`];
    return data;
  } catch (error) {
    console.log(error);
  }
};
