import React from 'react';
import styles from './style/alarmCard.module.css';

const AlarmCard = ({ alarm }: any) => {
  return (
    <>
      <li className={styles.alarmCardBody}>
        <section className={styles.alarmContentSection}>
          <p>{`${alarm.data.sender}님이`}</p>
          <p>{alarm.message.text}</p>
        </section>
        <section className={styles.btnSection}>
          <button className={styles.accepBtn}>수락</button>
          <button className={styles.refusalBtn}>거절</button>
        </section>
      </li>
    </>
  );
};

export default AlarmCard;
