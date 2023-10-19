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

const getMyRoomInfoApi = async (room_id: string) => {
  try {
    const getComplet = await axios.get<IRoomInfo>(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/room/${room_id}.json`
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

export {
  getRoomListApi,
  getMyRoomInfoApi,
  postCreateRoomApi,
  updateDetailDateContentsApi,
};
