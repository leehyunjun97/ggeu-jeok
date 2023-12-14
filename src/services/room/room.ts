import axios from 'axios';
import { IDateDetail, IRoomInfo } from '../../types/room';
import { firebaseUrl } from '../../constants/url/baseUrl';

const getRoomListApi = async () => {
  try {
    const getComplet = await axios.get(`${firebaseUrl}/room.json`);
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyRoomInfoApi = async (room_id: string) => {
  try {
    const getComplet = await axios.get<IRoomInfo>(
      `${firebaseUrl}/room/${room_id}.json`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyDateDetailInfoApi = async (room_uuid: string, date: string) => {
  try {
    const getComplet = await axios.get<{
      [key: string]: IDateDetail;
    }>(
      `${firebaseUrl}/room/${room_uuid}/date.json?orderBy="dateDetail"&equalTo="${date}"`
    );

    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postCreateRoomApi = async (roomInfo: IRoomInfo) => {
  try {
    const postComplet = await axios.post(`${firebaseUrl}/room.json`, roomInfo);
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
      `${firebaseUrl}/room/${roomInfo.uuid}.json`,
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
  getMyDateDetailInfoApi,
  postCreateRoomApi,
  updateDetailDateContentsApi,
};
