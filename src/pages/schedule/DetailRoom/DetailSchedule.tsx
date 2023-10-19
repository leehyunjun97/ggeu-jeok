import React, { useEffect } from 'react';
import styles from './style/detailSchedule.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilState, useRecoilValue } from 'recoil';
import TitleSection from './TitleSection';
import {
  detailScheduleInfo,
  myRoomProfile,
  roomInfo,
} from '../../../recoil/room/roomInfo';
import Span from '../../../components/common/Span/Span';
import ContentSection from './ContentSection';
import { useLocation, useNavigate } from 'react-router-dom';
const DetailSchedule = () => {
  const room = useRecoilValue(roomInfo);
  const myProfile = useRecoilValue(myRoomProfile);
  const detailDatePath = useLocation().pathname.split('/')[4];
  const navigate = useNavigate();
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);

  useEffect(() => {
    const detailDate =
      room && room.date.filter((item) => item.dateDetail === detailDatePath);

    if (!!!detailDate.length) {
      alert('잘못된 접근입니다.');
      navigate('/main');
      return;
    }

    setDetailSchedule(detailDate[0]);
  }, [detailDatePath, navigate, room, setDetailSchedule]);

  return (
    <div className={styles.main}>
      <Span.GoBackSpan text={'뒤로가기'} className={'backSpan'} />
      <section className={styles.roomLeftSection}>
        <Span text={'멤버 목록'} className={'sectionsSpan'} />
        <MembersList room={room} />
      </section>
      <section className={styles.roomRightSection}>
        {detailSchedule && (
          <>
            <TitleSection myProfile={myProfile} />
            <ContentSection myProfile={myProfile} />
          </>
        )}
      </section>
    </div>
  );
};

export default DetailSchedule;
