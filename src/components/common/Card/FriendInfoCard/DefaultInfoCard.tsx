import React from 'react';
import styles from './style/friendInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IDefaultCardProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultInfoCard = ({ onClick }: IDefaultCardProps) => {
  return (
    <button
      className={`${styles.cardBody} ${styles.defaultLi}`}
      onClick={onClick}
    >
      <p className={styles.cardTitle}>친구를 만들어보세요!</p>
    </button>
  );
};

DefaultInfoCard.Add = ({ onClick }: IDefaultCardProps) => {
  return (
    <button
      className={`${styles.cardBody} ${styles.defaultLi}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
    </button>
  );
};

export default DefaultInfoCard;
