import React from 'react';
import styles from './style/input.module.css';

type TInputType = 'text' | 'email' | 'password';

interface IInputProps {
  placeholder?: string;
  type: TInputType;
  className?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  style?: React.CSSProperties;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}

interface IFileProps {
  style?: React.CSSProperties;
  fileRef?: React.RefObject<HTMLInputElement>;
  accept: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface ICheckboxProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
}

interface ILocationProps {
  value: string;
}

const Input = ({
  placeholder,
  type,
  className,
  value,
  onChange,
  inputRef,
  style,
  onKeyDown,
  readOnly,
}: IInputProps) => {
  return (
    <input
      style={{ ...style }}
      placeholder={placeholder}
      type={type}
      className={`${styles[`${className}`]} ${styles.basicInput}`}
      value={value}
      onChange={onChange}
      ref={inputRef}
      onKeyDown={onKeyDown}
      readOnly={readOnly}
    />
  );
};

Input.Location = ({ value }: ILocationProps) => {
  return (
    <input
      type='location'
      value={value}
      readOnly={true}
      className={styles.basicInput}
    />
  );
};

Input.File = ({ accept, fileRef, onChange, style }: IFileProps) => {
  return (
    <input
      className={styles.basicInput}
      type={'file'}
      style={{ ...style }}
      ref={fileRef}
      accept={accept}
      onChange={onChange}
    />
  );
};

Input.Checkbox = ({ className, id, onChange }: ICheckboxProps) => {
  return (
    <input
      type='checkbox'
      id={id}
      className={`${styles[`${className}`]} ${styles.basicInput}`}
      onChange={onChange}
    />
  );
};

export default Input;
