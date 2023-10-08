import React from 'react';
import styles from './styles/button.module.css';

interface IButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  className?: string;
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

export default Button;
