import React from 'react';
import styles from './styles/backgroundLoading.module.css';
import loadingImg from '../../../assets/loadingImg.gif';
import sectionmg from '../../../assets/sectionLoadingImg.gif';
import Portal from '../Modal/Portal/Portal';

const BackgroundLoading = () => {
  return (
    <Portal id={'loading'}>
      <div className={styles.background}></div>
      <div className={styles.loadingSection}>
        <img src={loadingImg} alt='' />
      </div>
    </Portal>
  );
};

BackgroundLoading.Section = () => {
  return (
    <Portal id={'loading'}>
      <div className={styles.loadingSection} style={{ top: '54%' }}>
        <img src={sectionmg} alt='' />
      </div>
    </Portal>
  );
};

export default BackgroundLoading;
