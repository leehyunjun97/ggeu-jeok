import React from 'react';
import styles from './style/label.module.css';

interface ILable {
  text?: string;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

const Label = ({ text, htmlFor, className, children }: ILable) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles[`${className}`]} ${styles.basicLabel}`}
    >
      {children}
      {text}
    </label>
  );
};

export default Label;
