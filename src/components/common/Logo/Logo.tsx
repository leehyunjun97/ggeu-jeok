import React from 'react';
import styles from './style/logo.module.css';

interface IProps {
  goMain?: () => void;
  nickName?: string;
}

const Logo = ({ goMain, nickName }: IProps) => {
  return (
    <h2 className={styles.mainLogo} onClick={goMain}>
      {nickName && <span>{nickName}'s </span>}끄적끄적
    </h2>
  );
};

export default Logo;
