import React from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail, IRoomInfo } from '../../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { detailScheduleInfo } from '../../../../recoil/room/roomInfo';

interface IProps {
  detailSchedule: IDateDetail;
  room: IRoomInfo;
}

const DetailScheduleCard = ({ detailSchedule, room }: IProps) => {
  const navigate = useNavigate();
  const setDetailSchedule = useSetRecoilState(detailScheduleInfo);

  const showDetailHandler = () => {
    navigate(
      `/schedule/${room.admin}/${room.uuid}/${detailSchedule.dateDetail}`
    );
    setDetailSchedule(detailSchedule);
  };

  return (
    <li className={styles.detailScheduleLiCard} onClick={showDetailHandler}>
      <p className={styles.cardTitle}>{detailSchedule.subTitle}</p>
      <p className={styles.dateNumber}>{detailSchedule.dateDetail}</p>
    </li>
  );
};
export default DetailScheduleCard;
