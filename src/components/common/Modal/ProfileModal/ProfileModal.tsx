import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/profileModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IProfileModalIProps {
  isProfileModal?: boolean;
  setIsProfileModal: Dispatch<SetStateAction<boolean>>;
  my?: boolean;
}

const ProfileModal = ({
  isProfileModal,
  setIsProfileModal,
  my,
}: IProfileModalIProps) => {
  const profileModalHandler = () => {
    setIsProfileModal(!isProfileModal);
  };

  return (
    <>
      <div
        className={styles.modalBackground}
        onClick={profileModalHandler}
      ></div>
      <div className={styles.modalSection}>
        <button onClick={profileModalHandler} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.titleSection}>
          <h4>{my ? '내' : '친구'} 정보</h4>
        </section>
      </div>
    </>
  );
};

export default ProfileModal;
