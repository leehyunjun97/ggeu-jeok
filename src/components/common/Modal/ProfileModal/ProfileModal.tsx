import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/profileModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { IFriendInfo } from '../../../../types/friend';
import ProfileSection from './ProfileSection';
import Portal from '../Portal/Portal';

interface IProfileModalIProps {
  isProfileModal?: boolean;
  setIsProfileModal: Dispatch<SetStateAction<boolean>>;
  my?: boolean;
  friendInfo?: IFriendInfo;
}

const ProfileModal = ({
  isProfileModal,
  setIsProfileModal,
  my,
  friendInfo,
}: IProfileModalIProps) => {
  const profileModalHandler = () => {
    setIsProfileModal(!isProfileModal);
  };

  const myInfo = useRecoilValue(userInfo);

  return (
    <Portal
      id='modal'
      children={
        <>
          <div
            className={styles.modalBackground}
            onClick={profileModalHandler}
          ></div>
          <div className={styles.modalSection}>
            <button
              onClick={profileModalHandler}
              className={styles.modalCloseBtn}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <section className={styles.titleSection}>
              <h4>{my ? '내' : '친구'} 정보</h4>
            </section>
            <ProfileSection info={my ? myInfo : friendInfo} my={my}/>
          </div>
        </>
      }
    />
  );
};

export default ProfileModal;
