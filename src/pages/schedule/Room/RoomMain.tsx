import React, { useState } from 'react';
import styles from './style/roomMain.module.css';
import MembersList from '../../../components/common/Section/UserInfoListUl/MembersList';
import DetailScheduleList from '../../../components/common/Section/DetailScheduleListUI/DetailScheduleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import RoomChattingDiv from '../../../components/Chat/ChattingDiv';
import Span from '../../../components/common/Span/Span';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../recoil/room/roomInfo';
import Button from '../../../components/common/Button/Button';

const RoomMain = () => {
  const [hide, setHide] = useState(false);
  const room = useRecoilValue(roomInfo);

  return (
    <div className={styles.main}>
      <Span.GoBackSpan text={'뒤로가기'} className={'backSpan'} />
      <Span.GoBackSpan text={'앞으로가기'} className={'goSpan'} />
      <section className={styles.roomLeftSection}>
        <Span text={'멤버 목록'} className={'sectionsSpan'} />
        <MembersList room={room} />
      </section>
      <section className={styles.roomRightSection}>
        <Span text={'계획 일정'} className={'sectionsSpan'} />
        <DetailScheduleList room={room} />
        <RoomChattingDiv hide={hide} />

        <Button
          children={<FontAwesomeIcon icon={faLocationDot} />}
          onClick={() => setHide(!hide)}
          className='chatToggleBtn'
          style={{ bottom: '60px' }}
        />

        <Button
          children={<FontAwesomeIcon icon={faComment} />}
          onClick={() => setHide(!hide)}
          className='chatToggleBtn'
        />
      </section>
    </div>
  );
};
export default RoomMain;
