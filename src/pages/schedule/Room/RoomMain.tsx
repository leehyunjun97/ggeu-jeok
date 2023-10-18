import React, { useState } from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import DetailScheduleList from '../../../components/common/Section/DetailScheduleListUI/DetailScheduleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import RoomChattingDiv from '../../../components/Chat/ChattingDiv';
import { useLocation } from 'react-router-dom';
import Span from '../../../components/common/Span/Span';

const RoomMain = () => {
  const [hide, setHide] = useState(false);
  const roomInfo = useLocation().state.roomInfo;

  return (
    <div className={styles.main}>
      <Span.GoBackSpan text={'뒤로가기'} className={'backSpan'} />
      <Span.GoBackSpan text={'앞으로가기'} className={'goSpan'} />
      <section className={styles.roomLeftSection}>
        <Span text={'멤버 목록'} className={'sectionsSpan'} />
        <MembersList roomInfo={roomInfo} />
      </section>
      <section className={styles.roomRightSection}>
        <Span text={'계획 일정'} className={'sectionsSpan'} />
        <DetailScheduleList roomInfo={roomInfo} />
        <RoomChattingDiv hide={hide} />
        <button className={styles.chatToggleBtn} onClick={() => setHide(!hide)}>
          <FontAwesomeIcon icon={faComment} />
        </button>
      </section>
    </div>
  );
};
export default RoomMain;
