import React from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail } from '../../../types/room';

interface IProps {
  detailSchedule: IDateDetail;
}

const DetailScheduleCard = ({ detailSchedule }: IProps) => {
  return (
    <li className={styles.detailScheduleLiCard}>
      <p className={styles.cardTitle}>{detailSchedule.subTitle}</p>
      <p className={styles.dateNumber}>{detailSchedule.dateDetail}</p>
    </li>
  );
};
export default DetailScheduleCard;
