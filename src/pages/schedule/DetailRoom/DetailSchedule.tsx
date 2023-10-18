import React, { useEffect, useState } from 'react';
import styles from './style/detailSchedule.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import { IMemberInfo } from '../../../types/room';
import { useLocation } from 'react-router-dom';
import { defaultMemberInfoState } from '../../../constants/room/member';
import TitleSection from './TitleSection';

const DetailSchedule = () => {
  const myInfo = useRecoilValue(userInfo);
  const detailSchedule = useLocation().state.detailSchedule;
  const roomInfo = useLocation().state.roomInfo;

  const [myProfile, setMyProfile] = useState<IMemberInfo>(
    defaultMemberInfoState
  );
  const [newContent, setNewContent] = useState(detailSchedule.content);

  // useEffect(() => {
  //   setMyProfile(
  //     roomInfo.member.filter(
  //       (item: IMemberInfo) => item.email === myInfo.email
  //     )[0]
  //   );
  // }, [myInfo.email, roomInfo.member]);

  return (
    <div className={styles.main}>
      <section className={styles.roomLeftSection}>
        <span className={styles.friendsListSpan}>멤버 목록</span>
        <MembersList roomInfo={roomInfo} />
      </section>
      <section className={styles.roomRightSection}>
        <TitleSection myProfile={myProfile} />

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
