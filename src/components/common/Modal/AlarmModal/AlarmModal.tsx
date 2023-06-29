import React from 'react';
import styles from './style/alarmModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';

const AlarmModal = ({ closeModal }: any) => {
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
        <section className={styles.searchSection}>
          <ul style={{ padding: '25px' }}>
            <AlarmCard />
          </ul>
        </section>
      </div>
    </>
  );
};
export default AlarmModal;
