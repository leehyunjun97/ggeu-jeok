import React from 'react';
import styles from './styles/errorMessage.module.css';

interface IErrorMessageProps {
  style: React.CSSProperties;
  text: string;
  className?: string;
}

const ErrorMessage = ({ style, text, className }: IErrorMessageProps) => {
  return (
    <div
      className={`${styles.errorMessageDiv} ${styles[`${className}`]}`}
      style={style}
    >
      <span>{text}</span>
    </div>
  );
};

export default ErrorMessage;
