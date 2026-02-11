'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'purple',
  size = 'md',
  ...rest
}: ButtonProps) {
  const baseStyle =
    'flex flex-wrap gap-3 justify-center font-medium text-base rounded-lg content-center transition-all duration-100';

  const variantStyle = {
    purple:
      'bg-purple hover:bg-white disabled:bg-dark-purple text-white disabled:text-gray-400 hover:text-purple cursor-pointer disabled:cursor-default',
    white:
      'bg-white text-black hover:bg-dark-purple text-dark-purple disabled:text-gray-400 hover:text-white cursor-allowed cursor-pointer disabled:cursor-default',
  };

  const sizeStyle = {
    sm: 'w-fit p-4',
    md: 'w-full px-7.5 py-3.5',
    lg: 'w-full px-5.5 py-3.5',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
