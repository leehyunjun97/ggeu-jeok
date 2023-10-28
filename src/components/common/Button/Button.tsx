import React from 'react';
import styles from './styles/button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  refusalOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
  type?: string;
}

const Button = ({ onClick, text, className }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[`${className}`]} ${styles.basicBtn}`}
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

Button.ReplyButton = ({
  onClick,
  refusalOnClick,
  className,
  type,
}: IButtonProps) => {
  return (
    <>
      <button
        className={`${styles.accepBtn} ${styles.basicBtn} ${
          styles[`${className}`]
        }`}
        onClick={onClick}
      >
        {type === 'profile' ? '수정' : '수락'}
      </button>
      <button
        className={`${styles.refusalBtn} ${styles.basicBtn} ${
          styles[`${className}`]
        }`}
        onClick={refusalOnClick}
      >
        {type === 'profile' ? '수정취소' : '거절'}
      </button>
    </>
  );
};

Button.CheckButton = ({ onClick }: IButtonProps) => {
  return (
    <button
      className={`${styles.refusalBtn} ${styles.basicBtn}`}
      onClick={onClick}
    >
      확인
    </button>
  );
};

export default Button;
