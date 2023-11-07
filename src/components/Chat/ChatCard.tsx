import React from 'react';
import styles from './styles/roomChattingDiv.module.css';
import { IChat } from '../../types/chat';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import { timeStringHandler } from '../../utils/common/date';
import { onErrorImg } from '../../constants/images/defaultImg';

interface IChatCardProps {
  chat: IChat;
}

const ChatCard = ({ chat }: IChatCardProps) => {
  const myInfo = useRecoilValue(userInfo);

  return (
    <>
      <li className={styles.chatCardLi}>
        {myInfo.uuid === chat.user_uuid ? (
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
        ) : (
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
        )}
      </li>
    </>
  );
};

export default ChatCard;
