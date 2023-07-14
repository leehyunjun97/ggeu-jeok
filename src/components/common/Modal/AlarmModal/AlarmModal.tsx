import React, { useState, useEffect } from 'react';
import styles from './style/alarmModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';
import { postMyAlarmApi } from '../../../../services/alarm/alarm';

const AlarmModal = ({ closeModal, email }: any) => {
  const [alarmData, setAlarmData] = useState<any[]>([]);

  useEffect(() => {
    const myAlarmList = async () => {
      setAlarmData(await postMyAlarmApi(email));
    };
    myAlarmList();
  }, [email]);
  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.titleSection}>
          <h4>알림</h4>
        </section>
        <section className={styles.alarmSection}>
          <ul style={{ padding: '25px' }}>
            {alarmData &&
              alarmData.map((item: any) => (
                <AlarmCard key={item.id} alarm={item} />
              ))}
          </ul>
        </section>
      </div>
    </>
  );
};
export default AlarmModal;
