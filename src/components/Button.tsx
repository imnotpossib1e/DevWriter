'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'white';
  size?: 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'purple',
  size = 'md',
  ...rest
}: ButtonProps) {
  const baseStyle =
    'flex flex-wrap gap-3 w-full justify-center font-medium text-base rounded-lg content-center transition-all duration-100';

  const variantStyle = {
    purple:
      'bg-purple hover:bg-white disabled:bg-dark-purple text-white hover:text-purple',
    white: 'bg-white disabled:bg-dark-purple text-black hover:text-purple',
  };

  const sizeStyle = {
    md: 'px-7.5 py-3.5',
    lg: 'px-5.5 py-3.5',
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
