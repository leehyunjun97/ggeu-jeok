import React from 'react';
import styles from './style/userInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';

interface IDefaultCardProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  add?: boolean;
}

const DefaultInfoCard = ({ onClick, add }: IDefaultCardProps) => {
  return (
    <li className={styles.cardBody}>
      {add ? (
        <Button
          children={
            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
          }
          onClick={onClick}
          className={'liCardBtn'}
        />
      ) : (
        <Button
          text={'친구를 추가해보세요!'}
          onClick={onClick}
          className={'liCardBtn'}
        />
      )}
    </li>
  );
};

export default DefaultInfoCard;
