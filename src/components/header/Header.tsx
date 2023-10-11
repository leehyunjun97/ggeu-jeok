import React, { useState } from 'react';
import styles from './style/header.module.css';
import Logo from '../common/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import AlarmModal from '../common/Modal/AlarmModal/AlarmModal';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  // const email = localStorage.getItem('id');
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
      {isModal && (
        <AlarmModal
          isModal={isModal}
          setIsModal={setIsModal}
          myInfo={userInfoRecoil}
        />
      )}
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
          <button onClick={logoutHandler} className={styles.logoutBtn}>
            로그아웃
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
