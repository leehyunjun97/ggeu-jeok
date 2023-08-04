import React from 'react';
import styles from './style/detailScheduleList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DetailScheduleCard from './DetailScheduleCard';

const DetailScheduleList = () => {
  return (
    <ul className={styles.ulList}>
      <DetailScheduleCard />
      <li className={styles.plusLi}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default DetailScheduleList;
