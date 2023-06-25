import React from 'react';
import styles from './style/home.module.css';
import Login from '../../components/login/Login';
import Logo from '../../components/common/Logo/Logo';

const Home = () => {
  return (
    <div className={styles.main}>
      <section className={styles.leftSection}>홈페이지소개</section>
      <section className={styles.rightSection}>
        <Logo />
        <Login />
      </section>
    </div>
  );
};

export default Home;
