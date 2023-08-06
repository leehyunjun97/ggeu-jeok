import React from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import DetailScheduleList from './DetailScheduleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import RoomChattingDiv from './RoomChattingDiv';

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
        <RoomChattingDiv />
        <button className={styles.chatToggleBtn}>
          <FontAwesomeIcon icon={faComment} />
        </button>
      </section>
    </div>
  );
};
export default RoomMain;
