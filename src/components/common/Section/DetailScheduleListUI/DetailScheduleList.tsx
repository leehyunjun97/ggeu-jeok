import React from 'react';
import styles from './style/detailScheduleList.module.css';
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
    </ul>
  );
};

export default DetailScheduleList;
