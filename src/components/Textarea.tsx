import React, { useCallback, useRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  onChange,
  ...rest
}: TextareaProps & { readOnly?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = ref.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      onChange?.(e);
    },
    [onChange],
  );

  return (
    <textarea
      ref={ref}
      className={`w-full min-h-25 h-auto md:py-3 py-2 md:pl-4 pl-3 border border-(--text-50) bg-(--text-10) text-sm md:text-base rounded-lg resize-none overflow-hidden`}
      onChange={autoResize}
      {...rest}
    />
  );
}
