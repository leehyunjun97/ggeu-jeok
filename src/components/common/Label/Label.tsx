import React from 'react';
import styles from './style/label.module.css';

interface ILable {
  text?: string;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
  key?: string;
}

const Label = ({ text, htmlFor, className, children, key }: ILable) => {
  return (
    <label
      key={key}
      htmlFor={htmlFor}
      className={`${styles[`${className}`]} ${styles.basicLabel}`}
    >
      {children}
      {text}
    </label>
  );
};

export default Label;
