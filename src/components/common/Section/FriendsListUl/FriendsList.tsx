import React from 'react';
import styles from './style/friendList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FriendsList = () => {
  return (
    <ul className={styles.ulList}>
      <li>asdasd</li>
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

export default FriendsList;
