import React, { useState } from 'react';
import styles from './styles/roomChattingDiv.module.css';
import Textarea from '../common/Textarea/Textarea';
import Button from '../common/Button/Button';

const ChatInputSection = () => {
  const [message, setMessage] = useState('');

  return (
    <section className={styles.inputSection}>
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button text={'전송'} onClick={() => {}} className={'messageBtn'} />
    </section>
  );
};

export default ChatInputSection;
