import React from 'react';
import styles from './style/home.module.css';
import Login from '../../components/login/Login';
import Logo from '../../components/common/Logo/Logo';

const Home = () => {

  return (
    <div className={styles.main}>
      <section className={styles.leftSection}></section>
      <section className={styles.rightSection}>
        <section className={styles.logoSection}>
          <Logo />
        </section>
        <Login />
      </section>
    </div>
  );
};

export default Home;
