import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { useRecoilState } from 'recoil';
import { roomInfo } from '../../recoil/room/roomInfo';
import { IChat } from '../../types/chat';
import { getMessageApi } from '../../services/chat/chat';
import ChatInputSection from './ChatInputSection';
import ChatCard from './ChatCard';

interface IProps {
  hide: boolean;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  const [room, setRoomInfo] = useRecoilState(roomInfo);
  const [chatList, setChatList] = useState<IChat[]>();
  const chatBodyRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    chatBodyRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const getCom = await getMessageApi('-random_uuid');

        console.log(getCom);

        if (!getCom) return;

        setChatList(getCom);
      } catch (error) {
        alert('message error');
      }
    };
    getMessages();
  }, []);

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
