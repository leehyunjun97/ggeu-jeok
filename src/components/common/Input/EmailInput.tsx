import React from 'react';

interface IEmailInputProps {
  placeholder: string;
  className: string;
  value: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EmailInput = ({
  placeholder,
  className,
  value,
  onBlur,
  onChange,
}: IEmailInputProps) => {
  return (
    <input
      type='email'
      placeholder={placeholder}
      className={className}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default EmailInput;
