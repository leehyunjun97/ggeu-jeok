import React from 'react';
import styles from './style/toast.module.css';

interface IToastProps {
  text: string;
}

const Toast = ({ text }: IToastProps) => {
  return (
    <div className={styles.toastSection1}>
      <p>{text}</p>
    </div>
  );
};

export default Toast;
