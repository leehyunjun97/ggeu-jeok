import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { useRecoilState } from 'recoil';
import { roomInfo } from '../../recoil/room/roomInfo';
import { IChat } from '../../types/chat';
import { getMessageApi } from '../../services/chat/chat';
import ChatInputSection from './ChatInputSection';
import ChatCard from './ChatCard';
import { onSnapshot } from 'firebase/firestore';
import { getSortedQuery, putIdAndSentAt } from '../../utils/chat/chat';

interface IProps {
  hide: boolean;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  const [room, setRoomInfo] = useRecoilState(roomInfo);
  const [chatList, setChatList] = useState<IChat[]>();
  const chatBodyRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const getCom = await getMessageApi('-random_uuid');

        if (!getCom) return;

        setChatList(getCom);
      } catch (error) {
        alert('message error');
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    const sortedQuery = getSortedQuery('-random_uuid');
    onSnapshot(sortedQuery, (querySnapshot) => {
      setChatList(putIdAndSentAt(querySnapshot));
    });
  }, []);

  useEffect(() => {
    const ref = chatBodyRef.current?.lastElementChild;
    ref?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  return (
    <div
      className={styles.chatDiv}
      // style={hide ? { display: 'block' } : { display: 'none' }}
    >
      <section className={styles.titleSection}>
        <h4>채팅방</h4>
      </section>
      <ul className={styles.bodySection} ref={chatBodyRef}>
        {!!chatList?.length &&
          chatList?.map((item) => <ChatCard key={item.id} chat={item} />)}
      </ul>

      <ChatInputSection />
    </div>
  );
};

export default RoomChattingDiv;
