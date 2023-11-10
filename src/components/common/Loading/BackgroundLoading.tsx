import React from 'react';
import styles from './styles/backgroundLoading.module.css';
import sectionmg from '../../../assets/sectionLoadingImg.gif';
import Portal from '../Modal/Portal/Portal';
import Img from '../Img/Img';

const BackgroundLoading = () => {
  return (
    <Portal id={'loading'}>
      <div className={styles.background}></div>
      <div className={styles.loadingSection}>
        <Img src={sectionmg} />
      </div>
    </Portal>
  );
};

BackgroundLoading.Section = () => {
  return (
    <Portal id={'loading'}>
      <div className={styles.loadingSection} style={{ top: '54%' }}>
        <Img src={sectionmg} />
      </div>
    </Portal>
  );
};

export default BackgroundLoading;
