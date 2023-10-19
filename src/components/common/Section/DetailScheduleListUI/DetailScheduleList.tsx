import React from 'react';
import styles from './style/detailScheduleList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DetailScheduleCard from '../../Card/DetailScheduleCard/DetailScheduleCard';
import { IDateDetail, IRoomInfo } from '../../../../types/room';

interface IDetailScheduleListProps {
  room: IRoomInfo;
}

const DetailScheduleList = ({ room }: IDetailScheduleListProps) => {
  return (
    <ul className={styles.ulList}>
      {room &&
        room.date.map((item: IDateDetail) => (
          <DetailScheduleCard
            key={item.dateDetail}
            detailSchedule={item}
            room={room}
          />
        ))}
      <li className={styles.plusLi}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default DetailScheduleList;
