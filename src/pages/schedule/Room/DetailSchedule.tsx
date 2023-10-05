import React from 'react';
import styles from './style/detailSchedule.module.css';
import MembersList from '../../../components/common/Section/FriendsListUl/MembersList';
import { useRecoilValue } from 'recoil';
import { detailScheduleInfo } from '../../../recoil/room/roomInfo';
import { IDateDetailContent } from '../../../types/room';

const DetailSchedule = () => {
  const detailSchedule = useRecoilValue(detailScheduleInfo);

  const test = () => {
    for (const [key, value] of Object.entries(detailSchedule.content)) {
      console.log(key, value);
    }
  };

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

        <ul className={styles.contentSection} onClick={test}>
          {Object.keys(detailSchedule.content).map((key) => (
            <li key={key} className={styles.contentLi}>
              <div className={styles.contentLeftSection}>{key}</div>
              <div className={styles.contentRightSection}>
                <textarea
                  className={styles.contentTextarea}
                  value={detailSchedule.content[key]}
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
