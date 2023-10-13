import axios from 'axios';
import { roomInfo } from '../../recoil/room/roomInfo';
import { IRoomInfo } from '../../types/room';

const getRoomListApi = async () => {
  try {
    const getComplet = await axios.get(`http://localhost:4000/room`);
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

export { getRoomListApi, postCreateRoomApi };
