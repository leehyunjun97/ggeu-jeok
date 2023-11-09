import React from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { IChat } from '../../types/chat';
import { timeStringHandler } from '../../utils/common/date';
import Img from '../common/Img/Img';

interface IChatCardProps {
  chat: IChat;
}

const OtherChatCard = ({ chat }: IChatCardProps) => {
  return (
    <li className={styles.chatCardLi}>
      <div className={styles.chatContentBox}>
        <section className={styles.youImgSection}>
          <Img src={chat.image} className={'profileImg'} />
        </section>
        <section className={styles.nicknAndContentSection}>
          <span className={styles.nicknameSpan}>{chat.nickName}</span>
          <div className={`${styles.speechBubble} ${styles.you}`}>
            {chat.text}
          </div>
        </section>
        <span className={`${styles.chatDate} ${styles.chatDateYou}`}>
          {timeStringHandler(chat.sentAt)}
        </span>
      </div>
    </li>
  );
};

export default OtherChatCard;
