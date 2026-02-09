'use client';
import Link from 'next/link';

{
  /* <Link
  href="/"
  target="_self"
  title="장보기 페이지 바로 가기"
  className={`${isActive('/shopping')} flex gap-2.5 bg-purple text-white rounded-b-lg px-5.5 py-3.5 justify-center content-center  transition-all duration-100`}
>
  <CodeXml className="h-5" />
  HOME
</Link>; */
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'purple' | 'white';
  size?: 'md' | 'lg';
}

export default function LinkButton({
  children,
  href,
  variant = 'purple',
  size = 'md',
  ...rest
}: LinkProps) {
  const baseStyle =
    'flex flex-wrap gap-3 font-medium text-base rounded-lg content-center transition-all duration-100';

  const variantStyle = {
    purple: 'bg-purple hover:bg-white  text-white hover:text-purple',
    white: 'bg-white  text-black hover:bg-dark-purple hover:text-white',
  };

  const sizeStyle = {
    md: 'px-4 py-2',
    lg: 'px-7.5 py-3.5',
  };

  return (
    <Link
      href={href}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
