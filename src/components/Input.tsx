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
      className={`w-full md:py-3 py-2 md:pl-4 pl-3 border border-(--text-50) text-sm md:text-base bg-(--text-10) rounded-lg`}
      onChange={onChange}
      {...rest}
    />
  );
}
