'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'white';
  size?: 'xs' | 'sm' | 'sm2' | 'md' | 'lg' | 'base';
}

export default function Button({
  children,
  variant = 'purple',
  size = 'md',
  ...rest
}: ButtonProps) {
  const baseStyle =
    'flex flex-nowrap gap-3 justify-center items-center font-medium md:text-base text-sm rounded-lg content-center transition-all duration-100';

  const variantStyle = {
    purple:
      'bg-purple hover:bg-white disabled:bg-dark-purple text-white disabled:text-gray-400 hover:text-purple cursor-pointer disabled:cursor-default',
    white:
      'bg-white text-black hover:bg-dark-purple text-dark-purple disabled:text-gray-400 hover:text-white cursor-allowed cursor-pointer disabled:cursor-default',
  };

  const sizeStyle = {
    xs: 'w-fit h-fit py-2 px-3 ',
    sm: 'w-fit md:p-4 p-2',
    sm2: 'w-fit lg:p-4 p-3',
    base: 'w-fit h-fit lg:py-3.5 py-2.5 lg:px-5 px-4',
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
