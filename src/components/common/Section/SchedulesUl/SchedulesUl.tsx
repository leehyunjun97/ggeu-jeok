import React from 'react';
import styles from './styles/schedulesUl.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SchedulesUl = () => {
  return (
    <ul className={styles.ulList}>
      <li>asdasd</li>
      <li>asdasd</li>
      <li>asdasd</li>
      <li>asdasd</li>
      <li className={styles.plusLi}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default SchedulesUl;
