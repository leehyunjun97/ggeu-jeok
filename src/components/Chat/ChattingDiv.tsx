import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../recoil/room/roomInfo';
import { IChat } from '../../types/chat';
import { getMessageApi } from '../../services/chat/chat';
import ChatInputSection from './ChatInputSection';
import ChatCard from './ChatCard';
import { onSnapshot } from 'firebase/firestore';
import {
  getSortedQuery,
  addIdAndSentAtToSnapshot,
} from '../../utils/chat/chat';
import { userInfo } from '../../recoil/user/user';
import OtherChatCard from './OtherChatCard';

interface IProps {
  hide: boolean;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  const room = useRecoilValue(roomInfo);
  const myInfo = useRecoilValue(userInfo);
  const [chatList, setChatList] = useState<IChat[]>();
  const chatBodyRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!room.uuid) return;

        const getCom = await getMessageApi(room.uuid);

        if (!getCom) return;

        setChatList(getCom);
      } catch (error) {
        alert('message error');
      }
    };
    getMessages();
  }, [room.uuid]);

  useEffect(() => {
    if (!room.uuid) return;
    const sortedQuery = getSortedQuery(room.uuid);
    onSnapshot(sortedQuery, (querySnapshot) => {
      setChatList(addIdAndSentAtToSnapshot(querySnapshot));
    });
  }, [room.uuid]);

  useEffect(() => {
    const ref = chatBodyRef.current?.lastElementChild;
    ref?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  return (
    <div
      className={styles.chatDiv}
      style={hide ? { display: 'block' } : { display: 'none' }}
    >
      <section className={styles.titleSection}>
        <h4>채팅방</h4>
      </section>
      <ul className={styles.bodySection} ref={chatBodyRef}>
        {!!chatList?.length &&
          chatList?.map((item) => {
            return item.user_uuid === myInfo.uuid ? (
              <ChatCard key={item.id} chat={item} />
            ) : (
              <OtherChatCard key={item.id} chat={item} />
            );
          })}
      </ul>

      <ChatInputSection />
    </div>
  );
};

export default RoomChattingDiv;
