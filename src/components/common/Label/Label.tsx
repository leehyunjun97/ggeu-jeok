import React from 'react';
import styles from './style/label.module.css';

interface ILable {
  text: string;
  htmlFor?: string;
  className?: string;
}

const Label = ({ text, htmlFor, className }: ILable) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles[`${className}`]} ${styles.roomCreateLabel}`}
    >
      {text}
    </label>
  );
};

export default Label;
