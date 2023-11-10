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
  areaRef?: React.RefObject<HTMLTextAreaElement>;
}

const Textarea = ({
  className,
  value,
  readonly,
  onChange,
  placeholder,
  onKeyDown,
  disable,
  areaRef,
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
      ref={areaRef}
    />
  );
};

export default Textarea;
