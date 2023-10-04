import React from 'react';
import styles from './styles/profileModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ProfileModal = ({ closeModal }: any) => {
  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.titleSection}>
          <h4>친구 정보</h4>
        </section>
      </div>
    </>
  );
};

export default ProfileModal;
