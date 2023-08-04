import React from 'react';
import styles from './style/detailScheduleCard.module.css';

const DetailScheduleCard = () => {
  return (
    <li className={styles.detailScheduleLiCard}>
      <p className={styles.cardTitle}>오늘은 이거</p>
    </li>
  );
};
export default DetailScheduleCard;
