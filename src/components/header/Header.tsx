import React from 'react';
import styles from './style/header.module.css';
import Logo from '../common/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('id');
    navigate('/');
  };
  return (
    <>
      <div className={styles.header}>
        <Logo />
        <div className={styles.headerSide}>
          <button>
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: '#000000' }}
              size='xl'
            />
          </button>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
