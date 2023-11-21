import React from 'react';
import styles from './style/heading.module.css';

interface IHeadingTitleProps {
  text: string;
  style?: React.CSSProperties;
}

const Title = ({ text, style }: IHeadingTitleProps) => {
  return (
    <h4 className={styles.basicTitle} style={{ ...style }}>
      {text}
    </h4>
  );
};

export default Title;
