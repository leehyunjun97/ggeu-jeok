import axios from 'axios';

const getRoomListApi = async () => {
  try {
    const getComplet = await axios.get(`http://localhost:4000/room`);
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyRoomListApi = async () => {
  try {
    const getComplet = await axios.get(`http://localhost:4000/room`);
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export { getRoomListApi };
