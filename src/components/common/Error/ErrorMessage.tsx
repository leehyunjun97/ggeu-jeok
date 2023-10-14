import React from 'react';
import styles from './styles/errorMessage.module.css';

interface IErrorMessageProps {
  style: string;
  text: string;
  className?: string;
}

const ErrorMessage = ({ style, text, className }: IErrorMessageProps) => {
  return (
    <div
      className={`${styles.errorMessageDiv} ${styles[`${style}`]} ${
        styles[`${className}`]
      }`}
    >
      <span>{text}</span>
    </div>
  );
};

export default ErrorMessage;
