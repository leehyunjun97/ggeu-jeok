import React from 'react';
import styles from './styles/textarea.module.css';

interface ITextareaProps {
  className?: string;
  value: string;
  readonly?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}

const Textarea = ({
  className,
  value,
  readonly,
  onChange,
  placeholder,
}: ITextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles[`${className}`]} ${styles.basic}`}
      value={value}
      readOnly={readonly}
      onChange={onChange}
    />
  );
};

export default Textarea;
