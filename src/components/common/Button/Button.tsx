import React from 'react';
import styles from './styles/button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  refusalOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string | React.ReactNode;
  className?: string;
  disable?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  accepText?: string;
  refusaaText?: string;
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

Button.CloseButton = ({ onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className={styles.modalCloseBtn}>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
};

Button.ReplyButton = ({
  onClick,
  refusalOnClick,
  className,
  disable,
  accepText,
  refusaaText,
}: IButtonProps) => {
  return (
    <>
      <button
        className={`${styles.accepBtn} ${styles.basicBtn} ${
          styles[`${className}`]
        }`}
        onClick={onClick}
        disabled={disable}
      >
        {accepText}
      </button>
      <button
        className={`${styles.refusalBtn} ${styles.basicBtn} ${
          styles[`${className}`]
        }`}
        onClick={refusalOnClick}
        disabled={disable}
      >
        {refusaaText}
      </button>
    </>
  );
};

Button.CheckButton = ({ onClick, disable, style }: IButtonProps) => {
  return (
    <button
      style={{ ...style }}
      className={`${styles.refusalBtn} ${styles.basicBtn}`}
      onClick={onClick}
      disabled={disable}
    >
      확인
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
