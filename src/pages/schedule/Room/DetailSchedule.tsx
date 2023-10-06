import React, { useEffect, useState } from 'react';
import styles from './style/detailSchedule.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilValue } from 'recoil';
import { detailScheduleInfo, roomInfo } from '../../../recoil/room/roomInfo';
import { userInfo } from '../../../recoil/user/user';
import { IMemberInfo } from '../../../types/room';

const DetailSchedule = () => {
  const detailSchedule = useRecoilValue(detailScheduleInfo);
  const roomInfoState = useRecoilValue(roomInfo);
  const myInfo = useRecoilValue(userInfo);
  const [myRoomInfo, setRoomInfo] = useState<IMemberInfo>({
    class: '',
    email: '',
    image: '',
    name: '',
    nickName: '',
  });
  const [newContent, setNewContent] = useState(detailSchedule.content);

  useEffect(() => {
    setRoomInfo(
      roomInfoState.member.filter((item) => item.email === myInfo.email)[0]
    );
  }, [myInfo.email, roomInfoState.member]);

  console.log(newContent);

  return (
    <div className={styles.main}>
      <section className={styles.roomLeftSection}>
        <span className={styles.friendsListSpan}>멤버 목록</span>
        <MembersList />
      </section>
      <section className={styles.roomRightSection}>
        <div className={styles.spanSection}>
          <span className={styles.subTitle}>{detailSchedule.subTitle}</span>
          <span className={styles.scheduleSpan}>세부 일정</span>
        </div>

        <ul className={styles.contentSection}>
          {Object.keys(detailSchedule.content).map((key) => (
            <li key={key} className={styles.contentLi}>
              <div className={styles.contentLeftSection}>{key}</div>
              <div className={styles.contentRightSection}>
                <textarea
                  className={styles.contentTextarea}
                  value={newContent[key]}
                  readOnly={myRoomInfo.class === 'member'}
                  onChange={(e) => {
                    const dummyObj = { ...newContent };
                    dummyObj[key] = e.target.value;
                    setNewContent(dummyObj);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DetailSchedule;
