import React, { useState } from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import DetailScheduleList from './DetailScheduleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import RoomChattingDiv from './RoomChattingDiv';
import { useLocation } from 'react-router-dom';

const RoomMain = () => {
  const [hide, setHide] = useState('block');
  const [showDetail, setShowDetail] = useState(false);
  const roomInfo = useLocation().state;

  const chatBtnToggleHandler = () => {
    hide === 'block' ? setHide('none') : setHide('block');
  };

  // const showDetailHandler = () => {
  //   setShowDetail(!showDetail);
  // };

  return (
    <div className={styles.main}>
      <section className={styles.roomLeftSection}>
        <span className={styles.friendsListSpan}>멤버 목록</span>
        <MembersList roomInfo={roomInfo} />
      </section>
      <section className={styles.roomRightSection}>
        <span className={styles.scheduleSpan}>계획 일정</span>
        <DetailScheduleList roomInfo={roomInfo}/>
        <RoomChattingDiv hide={hide} />
        <button className={styles.chatToggleBtn} onClick={chatBtnToggleHandler}>
          <FontAwesomeIcon icon={faComment} />
        </button>
      </section>
    </div>
  );
};
export default RoomMain;
