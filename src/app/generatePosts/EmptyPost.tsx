import { TextSelect } from 'lucide-react';

export default function EmptyPost() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4 my-auto ">
      <TextSelect className="w-30 h-30" strokeWidth={2} />
      <span className="flex flex-col items-center">
        <p className="text-xl font-semibold text-center mb-3">
          히스토리가 비어있어요
        </p>
        <p className="text-sm">새로운 포스트를 생성해보세요</p>
      </span>
    </div>
  );
}
