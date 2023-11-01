import React, { useState } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import Textarea from '../common/Textarea/Textarea';
import Button from '../common/Button/Button';
import { imgSrc } from '../../constants/sign/sign';

interface IProps {
  hide: boolean;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  const [message, setMessage] = useState('');

  return (
    <div
      className={styles.chatDiv}
      // style={hide ? { display: 'block' } : { display: 'none' }}
    >
      <section className={styles.titleSection}>
        <h4>채팅방</h4>
      </section>
      <ul className={styles.bodySection}>
        <li className={styles.chatCardLi}>
          <div
            className={styles.chatContentBox}
            style={{ justifyContent: 'flex-end' }}
          >
            <span className={styles.chatDate}>오전 11:10</span>
            <div className={styles.speechBubble}>안녕하세요</div>
          </div>
        </li>

        <li className={styles.chatCardLi}>
          <div className={styles.chatContentBox}>
            <section className={styles.youImgSection}>
              <img className={styles.youImg} src={imgSrc} alt='' />
            </section>
            <div className={`${styles.speechBubble} ${styles.you}`}>
              안녕 반가워
            </div>
            <span className={`${styles.chatDate} ${styles.chatDateYou}`}>
              오전 11:10
            </span>
          </div>
        </li>

        <li className={styles.chatCardLi}>
          <div className={styles.chatContentBox}>
            <section className={styles.youImgSection}>
              <img className={styles.youImg} src={imgSrc} alt='' />
            </section>
            <div className={`${styles.speechBubble} ${styles.you}`}>
              <p>
                dsvlkasdjvasdasdasdasdasdasddsvlkasdjvasdasdasdasdasdasddsvlkasdjvasdasdasdasdasdasddsvlkasdjvasdasdasdasdasdasd
              </p>
            </div>
            <span className={`${styles.chatDate} ${styles.chatDateYou}`}>
              오전 11:10
            </span>
          </div>
        </li>
      </ul>
      <section className={styles.inputSection}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button text={'전송'} onClick={() => {}} className={'messageBtn'} />
      </section>
    </div>
  );
};

export default RoomChattingDiv;
