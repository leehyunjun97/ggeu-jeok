import React, { useEffect, useState } from 'react';
import styles from './style/detailScheduleCard.module.css';
import { IDateDetail, IRoomInfo } from '../../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { detailScheduleInfo } from '../../../../recoil/room/roomInfo';
import { randomColorFunc } from '../../../../utils/common/randomColor';

interface IProps {
  detailSchedule: IDateDetail;
  room: IRoomInfo;
}

const DetailScheduleCard = ({ detailSchedule, room }: IProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const setDetailSchedule = useSetRecoilState(detailScheduleInfo);
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundColor(randomColorFunc());
  }, []);

  const showDetailHandler = () => {
    navigate(
      `/schedule/${room.admin}/${room.uuid}/${detailSchedule.dateDetail}`
    );
    setDetailSchedule(detailSchedule);
  };

  return (
    <li
      className={styles.detailScheduleLiCard}
      onClick={showDetailHandler}
      style={{ backgroundColor }}
    >
      <p className={styles.cardTitle}>{detailSchedule.subTitle}</p>
      <p className={styles.dateNumber}>{detailSchedule.dateDetail}</p>
    </li>
  );
};
export default DetailScheduleCard;
