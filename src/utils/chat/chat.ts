import { DocumentData, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../scripts/databaseFirebase';
import { IChat } from '../../types/chat';

const getSortedQuery = (room_uuid: string) => {
  const chatRef = collection(db, 'chat', room_uuid, '-user_uuid');
  const sortedQuery = query(chatRef, orderBy('sentAt', 'asc'));
  return sortedQuery;
};

const addIdAndSentAtToSnapshot = (querySnapshot: DocumentData) => {
  let chatList: DocumentData[] = [];

  chatList = querySnapshot.docs.map((doc: DocumentData) => {
    const timestamp = doc.data().sentAt;
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return { ...doc.data(), id: doc.id, sentAt: date };
  });

  return chatList as IChat[];
};

export { getSortedQuery, addIdAndSentAtToSnapshot };
