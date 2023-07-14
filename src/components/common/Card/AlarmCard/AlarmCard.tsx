import React from 'react';
import styles from './style/alarmCard.module.css';

const AlarmCard = ({ alarm }: any) => {
  return (
    <>
      <li className={styles.alarmCardBody}>
        <p>{alarm.message.text}</p>
        <section className={styles.btnSection}>
          <button className={styles.accepBtn}>수락</button>
          <button className={styles.refusalBtn}>거절</button>
        </section>
      </li>
    </>
  );
};

export default AlarmCard;
