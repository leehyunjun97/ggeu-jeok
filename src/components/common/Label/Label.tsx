import React from 'react';
import styles from './style/label.module.css';

interface Ilable {
  text: string;
}

const Label = ({ text }: Ilable) => {
  return <label className={styles.roomCreateLabel}>{text}</label>;
};

export default Label;
