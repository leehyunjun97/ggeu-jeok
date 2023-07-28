import React from 'react';
import styles from './styles/schedulesUl.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../../Card/ScheduleInfoCard/ScheduleInfoCard';

const SchedulesUl = () => {
  const navigate = useNavigate();

  return (
    <ul className={styles.ulList}>
      <ScheduleInfoCard />
      <li
        className={styles.plusLi}
        onClick={() => navigate('/schedule/create')}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default SchedulesUl;
