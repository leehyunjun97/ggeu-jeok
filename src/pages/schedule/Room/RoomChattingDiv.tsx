import React from 'react';
import styles from './style/roomChattingDiv.module.css';

interface IProps {
  hide: string;
}

const RoomChattingDiv = ({ hide }: IProps) => {
  return (
    <div className={styles.chatDiv} style={{ display: `${hide}` }}>
      asdasd
    </div>
  );
};

export default RoomChattingDiv;
