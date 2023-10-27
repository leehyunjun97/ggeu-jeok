import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';

interface IDefaultCardProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  add?: boolean;
}

const DefaultScheduleCard = ({ onClick, add }: IDefaultCardProps) => {
  return (
    <li className={styles.scheduleLiCard}>
      <Button
        text={
          add ? (
            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
          ) : (
            '방을 생성해보세요!'
          )
        }
        onClick={onClick}
        className={'liCardBtn'}
      />
    </li>
  );
};
export default DefaultScheduleCard;
