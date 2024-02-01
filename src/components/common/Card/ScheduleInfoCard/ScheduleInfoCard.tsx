import React, { useEffect, useState } from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IRoomInfo } from '../../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { roomInfo } from '../../../../recoil/room/roomInfo';
import { randomColorFunc } from '../../../../utils/common/randomColor';
import { dateStringHandler } from '../../../../utils/common/date';

interface IScheduleCardProps {
  room: IRoomInfo;
}

const ScheduleInfoCard = ({ room }: IScheduleCardProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const setRoomInfo = useSetRecoilState(roomInfo);
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundColor(randomColorFunc());
  }, []);

  const goingRoomHandler = () => {
    navigate(`/schedule/${room.admin}/${room.uuid}`);
    setRoomInfo(room);
  };

  return (
    <li
      className={styles.scheduleLiCard}
      onClick={goingRoomHandler}
      style={{ backgroundColor }}
    >
      <p className={styles.cardTitle}>{room.title}</p>
      <section className={styles.bottomSection}>
        <p style={{ fontSize: '11px' }}>{dateStringHandler(room.dDay!)}</p>
        <p className={styles.membersNumber}>
          <FontAwesomeIcon icon={faUser} /> {room.member.length}
        </p>
      </section>
    </li>
  );
};

export default ScheduleInfoCard;
