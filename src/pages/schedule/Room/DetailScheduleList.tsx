import React from 'react';
import styles from './style/detailScheduleList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DetailScheduleCard from './DetailScheduleCard';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../recoil/room/roomInfo';

const DetailScheduleList = () => {
  const getRoomInfo = useRecoilValue(roomInfo);

  console.log(getRoomInfo);

  return (
    <ul className={styles.ulList}>
      {getRoomInfo &&
        getRoomInfo.date.map((item) => (
          <DetailScheduleCard key={item.id} detailSchedule={item} />
        ))}
      <li className={styles.plusLi}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default DetailScheduleList;
