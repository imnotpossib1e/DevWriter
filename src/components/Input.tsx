import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  // readOnly = false,
  onChange,
  ...rest
}: InputProps & { readOnly?: boolean }) {
  const widthClasses = {};

  return (
    <input
      className={`w-full py-3 pl-4 border border-white/50 bg-white/10 rounded-lg`}
      onChange={onChange}
      {...rest}
    />
  );
}
