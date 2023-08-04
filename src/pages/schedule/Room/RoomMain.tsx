import React from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../recoil/room/roomInfo';
import DetailScheduleList from './DetailScheduleList';

const RoomMain = () => {
  return (
    <div className={styles.main}>
      <section className={styles.roomLeftSection}>
        <span className={styles.friendsListSpan}>멤버 목록</span>
        <MembersList />
      </section>
      <section className={styles.roomRightSection}>
        <span className={styles.scheduleSpan}>계획 일정</span>
        <DetailScheduleList />
      </section>
    </div>
  );
};
export default RoomMain;
