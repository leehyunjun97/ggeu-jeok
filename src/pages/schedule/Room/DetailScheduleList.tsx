import React from 'react';
import styles from './style/detailScheduleList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DetailScheduleCard from './DetailScheduleCard';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../recoil/room/roomInfo';
import { IDateDetail, IRoomInfo } from '../../../types/room';

interface IDetailScheduleListProps {
  roomInfo: IRoomInfo;
}

const DetailScheduleList = ({ roomInfo }: IDetailScheduleListProps) => {
  // const getRoomInfo = useRecoilValue(roomInfo);

  return (
    <ul className={styles.ulList}>
      {roomInfo &&
        roomInfo.date.map((item: IDateDetail) => (
          <DetailScheduleCard
            key={item.dateDetail}
            detailSchedule={item}
            roomInfo={roomInfo}
          />
        ))}
      <li className={styles.plusLi}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default DetailScheduleList;
