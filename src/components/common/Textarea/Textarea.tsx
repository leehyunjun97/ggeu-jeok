import React from 'react';
import styles from './styles/textarea.module.css';

interface ITextareaProps {
  className?: string;
  value: string;
  readonly?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = ({ className, value, readonly, onChange }: ITextareaProps) => {
  return (
    <textarea
      className={`${styles[`${className}`]} ${styles.basic}`}
      value={value}
      readOnly={readonly}
      onChange={onChange}
    />
  );
};

export default Textarea;
