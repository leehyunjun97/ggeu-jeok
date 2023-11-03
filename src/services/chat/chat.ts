import {  getDocs } from 'firebase/firestore';
import { getSortedQuery, putIdAndSentAt } from '../../utils/chat/chat';

const getMessageApi = async (room_uuid: string) => {
  try {
    const sortedQuery = getSortedQuery(room_uuid);
    const querySnapshot = await getDocs(sortedQuery);

    return putIdAndSentAt(querySnapshot);
  } catch (error: any) {
    alert('message error!');
    throw new Error(error.message);
  }
};

export { getMessageApi };
