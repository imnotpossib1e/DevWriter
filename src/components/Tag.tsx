'use client';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  varient?: 'purple' | 'tutorial' | 'til' | 'troubleShooting';
}

export default function Tag({
  children,
  varient = 'purple',
  ...rest
}: TagProps) {
  const baseStyle =
    'flex justify-center items-center gap-2 w-fit border px-2 py-0.5 rounded-lg text-sm';

  const varientStyle = {
    purple: 'bg-purple/40 border-purple/90',
    tutorial: 'bg-[#77FFA2]/40 border-[#77FFA2]/90',
    til: 'bg-[#826FFF]/40 border-[#826FFF]/90',
    troubleShooting: 'bg-[#FF6363]/40 border-[#FF6363]/90',
  };

  return (
    <span className={`${baseStyle} ${varientStyle[varient]}`} {...rest}>
      {children}
    </span>
  );
}
