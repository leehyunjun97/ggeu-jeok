import React, { useState } from 'react';
import styles from './chat.module.css';

const Chat = () => {
  const [chat, setChat] = useState('');

  return (
    <div className={styles.main}>
      <h2>chat</h2>
      <section className={styles.chatBodySection}>
        <div className={`${styles.chatContent} ${styles.myChat}`}>안녕</div>
        <div className={styles.chatContent}>상대: 안녕</div>
        <div className={`${styles.chatContent} ${styles.myChat}`}>
          그래 안녕
        </div>
        <div className={styles.chatContent}>상대: 어 그래 안녕</div>
      </section>
      <section className={styles.chatInputSection}>
        <input
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              alert('채팅');
            }
          }}
        />
      </section>
    </div>
  );
};

export default Chat;
