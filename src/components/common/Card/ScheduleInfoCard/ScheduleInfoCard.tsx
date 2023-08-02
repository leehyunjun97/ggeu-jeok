import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
const ScheduleInfoCard = () => {
  return (
    <li className={styles.scheduleLiCard}>
      <p className={styles.cardTitle}>오랜만에 놀러가요잉</p>
      <p className={styles.period}>
        <FontAwesomeIcon icon={faClock} className={styles.periodIcon} />5 ~ 7
      </p>
      <p className={styles.membersNumber}>
        <FontAwesomeIcon icon={faUser} /> 5
      </p>
    </li>
  );
};

export default ScheduleInfoCard;
