import React from 'react';
import styles from './style/detailSchedule.module.css';

const TitleSection = () => {
  return (
    <div className={styles.spanSection}>
      {/* {isTitle ? (
        <span className={styles.subTitle} onClick={subTitleToggle}>
          {detailSchedule.subTitle}
        </span>
      ) : (
        <div>
          <input
            type='text'
            value={newTitle}
            readOnly={myProfile.class === 'member'}
          />
          <button>수정</button>
          <button onClick={subTitleToggle}>취소</button>
        </div>
      )} */}
      <span></span>
      <span className={styles.scheduleSpan}>세부 일정</span>
    </div>
  );
};

export default TitleSection;
