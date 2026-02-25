'use client';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  varient?: 'purple' | 'green' | 'darkpurple' | 'red' | 'blue';
  template?: string;
}

export default function Tag({
  children,
  varient = 'purple',
  template,
  ...rest
}: TagProps) {
  const baseStyle =
    'flex flex-nowrap justify-center items-center gap-2 w-fit h-fit border px-2 py-0.5 rounded-lg md:text-sm text-xs';

  const varientStyle = {
    purple: 'bg-purple/40 border-purple/90',
    green: 'bg-(--green-30) border-(--green-90)',
    darkpurple: 'bg-[#826FFF]/40 border-[#826FFF]/90',
    blue: 'bg-blue-500/40 border-blue-500/90',
    red: 'bg-[#FF6363]/40 border-[#FF6363]/90',
  };

  const getVarientFormTemplate = (template: string): TagProps['varient'] => {
    switch (template) {
      case 'tutorial':
        return 'green';
      case 'til':
        return 'blue';
      case 'troubleShooting':
        return 'red';
      default:
        return 'purple';
    }
  };

  const finalVarient = template
    ? getVarientFormTemplate(template)
    : (varient ?? 'purple');

  return (
    <span className={`${baseStyle} ${varientStyle[finalVarient!]}`} {...rest}>
      {children}
    </span>
  );
}
