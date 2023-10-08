import React from 'react';
import styles from './styles/errorMessage.module.css';

interface IErrorMessageProps {
  style: React.CSSProperties;
  text: string;
}

const ErrorMessage = ({ style, text }: IErrorMessageProps) => {
  return (
    <div className={styles.errorMessageDiv} style={style}>
      <span>{text}</span>
    </div>
  );
};

export default ErrorMessage;
