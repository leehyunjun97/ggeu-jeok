import React from 'react';
import styles from './style/roomChattingDiv.module.css';

interface IProps {
  hide: string;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  return (
    <div className={styles.chatDiv} style={{ display: `${hide}` }}>
      <section className={styles.titleSection}>
        <h4>채팅방</h4>
      </section>
    </div>
  );
};

export default RoomChattingDiv;
