import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IRoomInfo } from '../../../../types/room';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { roomInfo } from '../../../../recoil/room/roomInfo';

interface IScheduleCardProps {
  room: IRoomInfo;
}

const ScheduleInfoCard = ({ room }: IScheduleCardProps) => {
  const setRoomInfo = useSetRecoilState(roomInfo);
  const navigate = useNavigate();

  const goingRoomHandler = () => {
    navigate(`/schedule/${room.admin}/${room.uuid}`);
    setRoomInfo(room);
  };

  return (
    <li className={styles.scheduleLiCard} onClick={goingRoomHandler}>
      <p className={styles.cardTitle}>{room.title}</p>
      <p className={styles.membersNumber}>
        <FontAwesomeIcon icon={faUser} /> {room.member.length}
      </p>
    </li>
  );
};

export default ScheduleInfoCard;
