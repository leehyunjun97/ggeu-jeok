import React from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail } from '../../../types/room';

interface IProps {
  detailSchedule: IDateDetail;
  showDetailHandler: () => {};
}

const DetailScheduleCard = ({ detailSchedule, showDetailHandler }: IProps) => {
  return (
    <li className={styles.detailScheduleLiCard} onClick={showDetailHandler}>
      <p className={styles.cardTitle}>{detailSchedule.subTitle}</p>
      <p className={styles.dateNumber}>{detailSchedule.dateDetail}</p>
    </li>
  );
};
export default DetailScheduleCard;
