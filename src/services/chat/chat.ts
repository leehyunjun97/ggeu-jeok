import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getSortedQuery, putIdAndSentAt } from '../../utils/chat/chat';
import { db } from '../../scripts/databaseFirebase';
import { IUserInfo } from '../../types/user';

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

const messagePushApi = async (
  message: string,
  info: IUserInfo,
  room_uuid: string
) => {
  try {
    await addDoc(collection(db, 'chat', room_uuid, '-user_uuid'), {
      user_uuid: info.uuid,
      text: message,
      nickName: info.nickName,
      sentAt: new Date(),
      image: info.image,
    });
  } catch (error: any) {
    alert('message push error!');
    throw new Error(error.message);
  }
};

export { getMessageApi, messagePushApi };
