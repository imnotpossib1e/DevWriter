'use client';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  varient?: 'purple' | 'green' | 'darkpurple' | 'red';
  template?: string;
}

export default function Tag({
  children,
  varient = 'purple',
  template,
  ...rest
}: TagProps) {
  const baseStyle =
    'flex justify-center items-center gap-2 w-fit h-fit border px-2 py-0.5 rounded-lg text-sm';

  // const finalVarient = template
  //   ? getVarientFormTemplate(template)
  //   : varient || 'purple';

  template === 'tutorial'
    ? (varient = 'green')
    : template === 'til'
      ? (varient = 'darkpurple')
      : (varient = 'red');

  const varientStyle = {
    purple: 'bg-purple/40 border-purple/90',
    green: 'bg-[#77FFA2]/30 border-[#77FFA2]/90',
    darkpurple: 'bg-[#826FFF]/40 border-[#826FFF]/90',
    red: 'bg-[#FF6363]/40 border-[#FF6363]/90',
  };

  return (
    <span className={`${baseStyle} ${varientStyle[varient]}`} {...rest}>
      {children}
    </span>
  );
}
