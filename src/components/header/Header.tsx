import React, { useState } from 'react';
import styles from './style/header.module.css';
import Logo from '../common/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import AlarmModal from '../common/Modal/AlarmModal/AlarmModal';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import ProfileModal from '../common/Modal/ProfileModal/ProfileModal';

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
          <button
            onClick={() => setIsModal(!isModal)}
            className={styles.alarmBtn}
          >
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: '#000000' }}
              size='xl'
            />
          </button>
          <button
            onClick={() => setIsProfileModal(!isProfileModal)}
            className={styles.logoutBtn}
          >
            내정보
          </button>
          <button onClick={logoutHandler} className={styles.logoutBtn}>
            로그아웃
          </button>
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
        />
      )}
      <Outlet />
    </>
  );
};

export default Header;
