import React, { useState } from 'react';
import styles from './style/header.module.css';
import Logo from '../common/Logo/Logo';
import { Outlet, useNavigate } from 'react-router-dom';
import AlarmModal from '../common/Modal/AlarmModal/AlarmModal';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import ProfileModal from '../common/Modal/ProfileModal/ProfileModal';
import Button from '../common/Button/Button';

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const userInfoRecoil = useRecoilValue(userInfo);
  const userInfoReset = useResetRecoilState(userInfo);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('id');
    userInfoReset();
    navigate('/');
  };

  return (
    <>
      <div className={styles.header}>
        <Logo
          goMain={() => navigate('/main')}
          nickName={userInfoRecoil.nickName ?? ''}
        />
        <div className={styles.headerSide}>
          <Button.AlarmButton
            onClick={() => setIsModal(!isModal)}
            className='headerBtn'
          />
          <Button
            onClick={() => setIsProfileModal(!isProfileModal)}
            text='내정보'
            className='headerBtn'
          />
          <Button
            onClick={logoutHandler}
            text='로그아웃'
            className='headerBtn'
          />
        </div>
      </div>
      {isModal && (
        <AlarmModal
          isModal={isModal}
          setIsModal={setIsModal}
          myInfo={userInfoRecoil}
        />
      )}
      {isProfileModal && (
        <ProfileModal
          isProfileModal={isProfileModal}
          setIsProfileModal={setIsProfileModal}
          my={true}
        />
      )}
      <Outlet />
    </>
  );
};

export default Header;
