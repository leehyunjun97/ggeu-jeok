import React from 'react';
import styles from './styles/input.module.css';

interface IInputProps {
  placeholder?: string;
  type: string;
  className?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  style?: React.CSSProperties;
  accept?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}

const Input = ({
  placeholder,
  type,
  className,
  value,
  onChange,
  inputRef,
  style,
  accept,
  onKeyDown,
  readOnly,
}: IInputProps) => {
  return (
    <input
      style={{ ...style }}
      placeholder={placeholder}
      type={type}
      accept={accept}
      className={`${styles[`${className}`]} ${styles.basicInput}`}
      value={value}
      onChange={onChange}
      ref={inputRef}
      onKeyDown={onKeyDown}
      readOnly={readOnly}
    />
  );
};

export default Input;
