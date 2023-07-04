import React from 'react';
import styles from './style/main.module.css';
import FriendsList from '../../components/common/Section/FriendsListUl/FriendsList';
import SchedulesUl from '../../components/common/Section/SchedulesUl/SchedulesUl';

const Main = () => {
  return (
    <div className={styles.main}>
      <section className={styles.mainLeftSection}>
        <span className={styles.friendsListSpan}>친구 목록</span>
        <FriendsList />
      </section>
      <section className={styles.mainRightSection}>
        <span className={styles.scheduleSpan}>계획 일정</span>
        <SchedulesUl />
      </section>
    </div>
  );
};

export default Main;
