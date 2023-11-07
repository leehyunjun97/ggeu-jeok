import React from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { IChat } from '../../types/chat';
import { timeStringHandler } from '../../utils/common/date';
import { onErrorImg } from '../../constants/images/defaultImg';

interface IChatCardProps {
  chat: IChat;
}

const OtherChatCard = ({ chat }: IChatCardProps) => {
  return (
    <li className={styles.chatCardLi}>
      <div className={styles.chatContentBox}>
        <section className={styles.youImgSection}>
          <img
            className={styles.youImg}
            src={chat.image}
            alt=''
            onError={onErrorImg}
          />
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
