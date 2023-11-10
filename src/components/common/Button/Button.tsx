import React from 'react';
import styles from './styles/button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  canecelOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string | React.ReactNode;
  className?: string;
  disable?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  isActive?: string;
}

const Button = ({
  onClick,
  text,
  className,
  disable,
  style,
  children,
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[`${className}`]} ${styles.basicBtn}`}
      style={{ ...style }}
      disabled={disable}
    >
      {text}
      {children}
    </button>
  );
};

Button.ActiveButton = ({
  onClick,
  disable,
  style,
  isActive = 'success',
  text,
}: IButtonProps) => {
  return (
    <button
      style={{ ...style }}
      className={`${
        isActive === 'success' ? styles.successBtn : styles.cancelBtn
      } ${styles.basicBtn}`}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </button>
  );
};

Button.CloseButton = ({ onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className={styles.modalCloseBtn}>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
};

Button.AlarmButton = ({ onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.headerBtn} ${styles.alarmBtn} ${styles.basicBtn}`}
    >
      <FontAwesomeIcon icon={faBell} style={{ color: '#000000' }} size='xl' />
    </button>
  );
};

export default Button;
