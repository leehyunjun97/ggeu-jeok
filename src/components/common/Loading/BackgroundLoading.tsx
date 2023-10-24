import React from 'react';
import styles from './styles/backgroundLoading.module.css';
import loadingImg from '../../../assets/loadingImg.gif';

const BackgroundLoading = () => {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.loadingSection}>
        <img src={loadingImg} alt='' />
      </div>
    </>
  );
};

export default BackgroundLoading;
