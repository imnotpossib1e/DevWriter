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
      className={`w-full min-h-25 h-auto py-3 pl-4 border border-white/50 bg-white/10 rounded-lg resize-none overflow-hidden`}
      onChange={autoResize}
      {...rest}
    />
  );
}
