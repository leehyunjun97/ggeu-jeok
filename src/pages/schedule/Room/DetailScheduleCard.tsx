import React from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail, IRoomInfo } from '../../../types/room';
import { useNavigate } from 'react-router-dom';

interface IProps {
  detailSchedule: IDateDetail;
  roomInfo: IRoomInfo;
}

const DetailScheduleCard = ({ detailSchedule, roomInfo }: IProps) => {
  const navigate = useNavigate();

  const showDetailHandler = () => {
    navigate(
      `/schedule/${roomInfo.admin}/${roomInfo.uuid}/${detailSchedule.dateDetail}`,
      {
        state: {
          detailSchedule: detailSchedule,
          roomInfo: roomInfo,
        },
      }
    );
  };

  return (
    <li className={styles.detailScheduleLiCard} onClick={showDetailHandler}>
      <p className={styles.cardTitle}>{detailSchedule.subTitle}</p>
      <p className={styles.dateNumber}>{detailSchedule.dateDetail}</p>
    </li>
  );
};
export default DetailScheduleCard;
