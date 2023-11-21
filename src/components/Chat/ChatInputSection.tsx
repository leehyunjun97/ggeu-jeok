import React, { useState, useRef } from 'react';
import styles from './style/roomChattingDiv.module.css';
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const messagePushHandler = async () => {
    try {
      if (message.trim().length === 0) return;
      setIsLoading(true);
      await messagePushApi(message, myInfo, room.uuid);
    } catch (error) {
      alert('message push error!');
    } finally {
      setIsLoading(false);
      setMessage('');
      messageRef.current?.focus();
    }
  };

  return (
    <section className={styles.inputSection}>
      <Textarea
        placeholder={'Enter 전송'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => shiftEnterKeyDownHandler(e, messagePushHandler)}
        disable={isLoading}
        areaRef={messageRef}
      />
      <Button
        text={'전송'}
        onClick={messagePushHandler}
        className={'messageBtn'}
        disable={isLoading}
      />
    </section>
  );
};

export default ChatInputSection;
