import React from 'react';
import styles from './style/span.module.css';
import { useNavigate } from 'react-router-dom';

interface ISpanProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const Span = ({ text, className }: ISpanProps) => {
  return (
    <span className={`${styles[`${className}`]} ${styles.basicSpan}`}>
      {text}
    </span>
  );
};

Span.Title = ({ text, className, onClick }: ISpanProps) => {
  return (
    <span
      className={`${styles[`${className}`]} ${styles.basicSpan} ${
        styles.sectionsSpan
      }`}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
Span.GoBackSpan = ({ text, className, style }: ISpanProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <span
      style={{ ...style }}
      className={`${styles[`${className}`]} ${styles.basicSpan}`}
      onClick={() => (className === 'backSpan' ? navigate(-1) : navigate(1))}
    >
      {text}
    </span>
  );
};

export default Span;
