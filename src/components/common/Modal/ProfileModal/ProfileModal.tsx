import React, { Dispatch, SetStateAction } from 'react';
import styles from './style/profileModal.module.css';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { IFriendInfo } from '../../../../types/friend';
import ProfileSection from './ProfileSection';
import Portal from '../Portal/Portal';
import Button from '../../Button/Button';
import Title from '../../Heading/Title';

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
            <Button.CloseButton onClick={profileModalHandler} />
            <section className={styles.titleSection}>
              <Title text={`${my ? '내' : '친구'} 정보`} />
            </section>
            <ProfileSection info={my ? myInfo : friendInfo} my={my} />
          </div>
        </>
      }
    />
  );
};

export default ProfileModal;
