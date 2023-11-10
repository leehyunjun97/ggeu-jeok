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
import { getDetailInfoApi } from '../../../utils/room/myDateDetail';
const DetailSchedule = () => {
  const room = useRecoilValue(roomInfo);
  const myProfile = useRecoilValue(myRoomProfile);
  const detailDatePath = useLocation().pathname.split('/')[4];
  const navigate = useNavigate();
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);

  // 따로 라우팅
  useEffect(() => {
    const getMyDetailHandler = async () => {
      try {
        const data = await getDetailInfoApi(room.uuid, detailDatePath);

        if (!data) {
          alert('잘못된 접근입니다.');
          navigate('/main');
          return;
        }

        setDetailSchedule(data);
      } catch (error) {}
    };
    room.uuid && getMyDetailHandler();
  }, [detailDatePath, navigate, room.uuid, setDetailSchedule]);

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
            <ContentSection
              myProfile={myProfile}
              detailDatePath={detailDatePath}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default DetailSchedule;
