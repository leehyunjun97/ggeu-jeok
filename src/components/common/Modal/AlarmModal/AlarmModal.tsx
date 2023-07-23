import React, { useState, useEffect } from 'react';
import styles from './style/alarmModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';
import { myAlarmApi } from '../../../../services/alarm/alarm';

const AlarmModal = ({ closeModal, email }: any) => {
  const [alarmData, setAlarmData] = useState([]);

  useEffect(() => {
    const myAlarmList = async () => {
      setAlarmData(await myAlarmApi(email));
    };
    myAlarmList();
  }, [email]);

  console.log(alarmData.length);

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
          {alarmData.length > 0 ? (
            <ul style={{ padding: '25px' }}>
              {alarmData.map((item: any) => (
                <AlarmCard
                  key={item.id}
                  alarm={item}
                  closeModal={closeModal}
                  email={email}
                />
              ))}
            </ul>
          ) : (
            <h4 className={styles.zeroAlarm}>알람이 없습니다.</h4>
          )}
        </section>
      </div>
    </>
  );
};
export default AlarmModal;
