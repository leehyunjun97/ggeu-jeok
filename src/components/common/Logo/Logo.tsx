import React from 'react';
import styles from './style/logo.module.css';

const Logo = ({ goMain }: any) => {
  return (
    <h2 className={styles.mainLogo} onClick={goMain}>
      끄적끄적
    </h2>
  );
};

export default Logo;
