import React from 'react';
import styles from './style/scheduleInfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { IRoomInfo } from '../../../../types/room';

interface IProps {
  room: IRoomInfo;
}

const ScheduleInfoCard = ({ room }: IProps) => {
  console.log(room);
  return (
    <li className={styles.scheduleLiCard}>
      <p className={styles.cardTitle}>{room.title}</p>
      {/* date 가공 */}
      <p className={styles.period}>
        <FontAwesomeIcon icon={faClock} className={styles.periodIcon} />5 ~ 7
      </p>
      <p className={styles.membersNumber}>
        <FontAwesomeIcon icon={faUser} /> {room.member.length}
      </p>
    </li>
  );
};

export default ScheduleInfoCard;
