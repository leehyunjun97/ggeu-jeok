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
  type?: string;
  disable?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
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
  type,
  disable,
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
        {type === 'profile' ? '수정' : '수락'}
      </button>
      <button
        className={`${styles.refusalBtn} ${styles.basicBtn} ${
          styles[`${className}`]
        }`}
        onClick={refusalOnClick}
        disabled={disable}
      >
        {type === 'profile' ? '수정취소' : '거절'}
      </button>
    </>
  );
};

Button.CheckButton = ({ onClick, disable }: IButtonProps) => {
  return (
    <button
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
