import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../scripts/databaseFirebase';
import { IChat } from '../../types/chat';

const getMessageApi = async (room_uuid: string) => {
  try {
    const chatRef = collection(db, 'chat', room_uuid, '-user_uuid');
    const sortedQuery = query(chatRef, orderBy('sentAt', 'asc'));
    const querySnapshot = await getDocs(sortedQuery);

    let chatList: DocumentData[] = [];

    chatList = querySnapshot.docs.map((doc) => {
      const timestamp = doc.data().sentAt;
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
      return { ...doc.data(), id: doc.id, sentAt: date };
    });

    return chatList as IChat[];
  } catch (error: any) {
    alert('message error!');
    throw new Error(error.message);
  }
};

export { getMessageApi };
