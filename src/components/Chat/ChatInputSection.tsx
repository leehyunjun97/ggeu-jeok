import React, { useState } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import Textarea from '../common/Textarea/Textarea';
import Button from '../common/Button/Button';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import { messagePushApi } from '../../services/chat/chat';
import { roomInfo } from '../../recoil/room/roomInfo';
import { shiftEnterKeyDownHandler } from '../../utils/common/keyDown';

const ChatInputSection = () => {
  const myInfo = useRecoilValue(userInfo);
  const room = useRecoilValue(roomInfo);
  const [message, setMessage] = useState('');

  const messagePushHandler = async () => {
    try {
      if (message.trim().length === 0) return;
      await messagePushApi(message, myInfo, room.uuid);
    } catch (error) {
      alert('message push error!');
    } finally {
      setMessage('');
    }
  };

  return (
    <section className={styles.inputSection}>
      <Textarea
        placeholder={'shift+enter 전송'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => shiftEnterKeyDownHandler(e, messagePushHandler)}
      />
      <Button
        text={'전송'}
        onClick={messagePushHandler}
        className={'messageBtn'}
      />
    </section>
  );
};

export default ChatInputSection;
