import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IRoomInfo } from '../../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { roomInfo } from '../../../../recoil/room/roomInfo';

interface IProps {
  room: IRoomInfo;
}

const ScheduleInfoCard = ({ room }: IProps) => {
  const setRommInfo = useSetRecoilState(roomInfo);
  const navigate = useNavigate();

  const goingRoomHandler = () => {
    setRommInfo(room);
    navigate(`/schedule/${room.admin}/${room.id}`);
  };

  return (
    <li className={styles.scheduleLiCard} onClick={goingRoomHandler}>
      <p className={styles.cardTitle}>{room.title}</p>
      {/* date 가공 */}
      {/* <p className={styles.period}>
        <FontAwesomeIcon icon={faClock} className={styles.periodIcon} />5 ~ 7
      </p> */}
      <p className={styles.membersNumber}>
        <FontAwesomeIcon icon={faUser} /> {room.member.length}
      </p>
    </li>
  );
};

export default ScheduleInfoCard;
