import React from 'react';
import styles from './style/roomChattingDiv.module.css';
import { IChat } from '../../types/chat';
import { timeStringHandler } from '../../utils/common/date';

interface IChatCardProps {
  chat: IChat;
}

const ChatCard = ({ chat }: IChatCardProps) => {
  return (
    <>
      <li className={styles.chatCardLi}>
        <div
          className={styles.chatContentBox}
          style={{ justifyContent: 'flex-end' }}
        >
          <span className={styles.chatDate}>
            {timeStringHandler(chat.sentAt)}
          </span>
          <section className={styles.nicknAndContentSection}>
            <div className={styles.speechBubble}>{chat.text}</div>
          </section>
        </div>
      </li>
    </>
  );
};

export default ChatCard;
