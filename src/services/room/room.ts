import axios from 'axios';
import { roomInfo } from '../../recoil/room/roomInfo';
import { IDateDetail, IDateDetailContent, IRoomInfo } from '../../types/room';

const getRoomListApi = async () => {
  try {
    const getComplet = await axios.get(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/room.json`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postCreateRoomApi = async (roomInfo: IRoomInfo) => {
  try {
    const postComplet = await axios.post(
      'https://ggeu-jeok-default-rtdb.firebaseio.com/room.json',
      roomInfo
    );
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateDetailDateContentsApi = async (
  roomInfo: IRoomInfo,
  detailDates: IDateDetail[]
) => {
  try {
    const patchCom = await axios.patch(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/room/${roomInfo.uuid}.json`,
      {
        ...roomInfo,
        date: [...detailDates],
      }
    );
    return patchCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// 그 이외의(기존) 콘텐츠들이랑 바꾸려는 콘텐츠 넣고
const updateDetailDateContentsByOneApi = async (
  roomInfo: IRoomInfo,
  detailDates: IDateDetail[],
  content: IDateDetailContent
) => {
  try {
    const patchCom = await axios.patch(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/room/${roomInfo.uuid}.json`,
      {
        ...roomInfo,
        date: [
          ...detailDates,
          {
            id: 1,
            dateDetail: '2023-10-20',
            subTitle: '제목',
            content,
          },
        ],
      }
    );
    return patchCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  getRoomListApi,
  postCreateRoomApi,
  updateDetailDateContentsApi,
  updateDetailDateContentsByOneApi,
};
