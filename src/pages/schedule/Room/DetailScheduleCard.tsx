import React from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail, IRoomInfo } from '../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { detailScheduleInfo } from '../../../recoil/room/roomInfo';

interface IProps {
  detailSchedule: IDateDetail;
  roomInfo: IRoomInfo;
}

const DetailScheduleCard = ({ detailSchedule, roomInfo }: IProps) => {
  const navigate = useNavigate();
  const setDetailRoom = useSetRecoilState(detailScheduleInfo);

  const showDetailHandler = () => {
    setDetailRoom(detailSchedule);
    navigate(
      `/schedule/${roomInfo.admin}/${roomInfo.id}/${detailSchedule.dateDetail}`
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
