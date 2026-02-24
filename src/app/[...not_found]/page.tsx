import LinkButton from '@/components/LinkButton';

export default function NotFound() {
  return (
    <main className="lex flex-col h-full my-auto">
      <div className="flex flex-col w-full justify-center items-center gap-1 mt-4 mb-20">
        <span className="font-extrabold text-[5rem] text-dark-green">404</span>
        <span className="font-semibold text-lg mb-4">
          페이지를 찾을 수 없습니다.
        </span>
        <span className="font-light">
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
        </span>
        <span className="font-light">
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </span>
        <span className="font-light mb-10">
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </span>
        <LinkButton href="/" size="lg">
          홈으로 돌아가기
        </LinkButton>
      </div>
    </main>
  );
}
