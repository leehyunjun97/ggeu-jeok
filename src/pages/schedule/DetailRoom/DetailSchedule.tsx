import React, { useEffect, useState } from 'react';
import styles from './style/detailSchedule.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import { IMemberInfo } from '../../../types/room';
import { useLocation } from 'react-router-dom';
import { defaultMemberInfoState } from '../../../constants/room/member';
import TitleSection from './TitleSection';
import { myRoomProfile } from '../../../recoil/room/roomInfo';
import Span from '../../../components/common/Span/Span';
import ContentSection from './ContentSection';

const DetailSchedule = () => {
  // const detailSchedule = useLocation().state.detailSchedule;
  const roomInfo = useLocation().state.roomInfo;

  const myProfile = useRecoilValue(myRoomProfile);

  return (
    <div className={styles.main}>
      <Span.GoBackSpan text={'뒤로가기'} className={'backSpan'} />
      <section className={styles.roomLeftSection}>
        <Span text={'멤버 목록'} className={'sectionsSpan'} />
        <MembersList roomInfo={roomInfo} />
      </section>
      <section className={styles.roomRightSection}>
        <TitleSection myProfile={myProfile} />
        <ContentSection myProfile={myProfile} />

        {/* <ul className={styles.contentSection}>
          {Object.keys(detailSchedule.content).map((key) => (
            <li key={key} className={styles.contentLi}>
              <div className={styles.contentLeftSection}>{key}</div>
              <div className={styles.contentRightSection}>
                <textarea
                  className={styles.contentTextarea}
                  value={newContent[key]}
                  readOnly={myProfile && myProfile.class === 'member'}
                  onChange={(e) => {
                    const dummyObj = { ...newContent };
                    dummyObj[key] = e.target.value;
                    setNewContent(dummyObj);
                  }}
                />
                <button
                  className={styles.updateBtn}
                  onClick={updateContentHandler}
                  style={
                    detailSchedule.content[key] === newContent[key]
                      ? { display: 'none' }
                      : { display: 'block' }
                  }
                >
                  수정하기
                </button>
              </div>
            </li>
          ))}
        </ul> */}
      </section>
    </div>
  );
};

export default DetailSchedule;
