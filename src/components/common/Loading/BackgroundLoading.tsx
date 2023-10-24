import React from 'react';
import styles from './styles/backgroundLoading.module.css';
import loadingImg from '../../../assets/loadingImg.gif';
import sectionmg from '../../../assets/sectionLoadingImg.gif';

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

BackgroundLoading.Section = () => {
  return (
    <div className={styles.loadingSection} style={{ top: '54%' }}>
      <img src={sectionmg} alt='' />
    </div>
  );
};

export default BackgroundLoading;
