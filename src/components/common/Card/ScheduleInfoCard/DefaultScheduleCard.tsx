import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IDefaultCardProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultScheduleCard = ({ onClick }: IDefaultCardProps) => {
  return (
    <button className={styles.scheduleLiCard} onClick={onClick}>
      <p className={`${styles.cardTitle} ${styles.defaultCardTitle}`}>
        방을 생성해보세요!
      </p>
    </button>
  );
};

DefaultScheduleCard.Add = ({ onClick }: IDefaultCardProps) => {
  return (
    <button className={styles.scheduleLiCard} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
    </button>
  );
};

export default DefaultScheduleCard;
