import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/roomChattingDiv.module.css';

interface IProps {
  hide: boolean;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  return (
    <div
      className={styles.chatDiv}
      style={hide ? { display: 'block' } : { display: 'none' }}
    >
      <section className={styles.titleSection}>
        <h4>채팅방</h4>
      </section>
    </div>
  );
};

export default RoomChattingDiv;
