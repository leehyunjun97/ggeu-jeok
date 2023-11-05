import React from 'react';
import styles from './styles/textarea.module.css';

interface ITextareaProps {
  className?: string;
  value: string;
  readonly?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disable?: boolean;
}

const Textarea = ({
  className,
  value,
  readonly,
  onChange,
  placeholder,
  onKeyDown,
  disable,
}: ITextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles[`${className}`]} ${styles.basic}`}
      value={value}
      readOnly={readonly}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disable}
    />
  );
};

export default Textarea;
