import React, { useEffect, Dispatch, SetStateAction } from 'react';
import styles from './style/toast.module.css';

interface IToastProps {
  text: string;
  time?: number;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const Toast = ({ text, time = 1300, visible, setVisible }: IToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible?.(false);
    }, time);
    return () => clearTimeout(timer);
  }, [setVisible, time]);

  return (
    <>
      {visible ? (
        <div className={styles.toastSection1}>
          <p>{text}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
