import React from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';

const DetailSchedule = () => {
  return (
    <div className={styles.main}>
      <section className={styles.roomLeftSection}>
        <span className={styles.friendsListSpan}>멤버 목록</span>
        <MembersList />
      </section>
      <section className={styles.roomRightSection}>
        <span className={styles.scheduleSpan}>세부 일정</span>
      </section>
    </div>
  );
};

export default DetailSchedule;
