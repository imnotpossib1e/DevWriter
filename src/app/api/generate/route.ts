import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 /api/generate 호출됨');
    const { topic, description, keywords, template, length, tone } =
      await request.json();

    const systemPrompt = getSystemPrompt(template);
    const userPrompt = `
      주제: ${topic}
      추가 설명: ${description}
      키워드: ${keywords}
      글 길이: ${length} (${length === 'short' ? '~800자' : length === 'normal' ? '~1200자' : '~2000자'})
      톤 앤 매너: ${tone}

      위 주제와 추가설명을 바탕으로 기술 블로그 글을 한글로 작성해주세요.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_completion_tokens:
        length === 'short' ? 800 : length === 'normal' ? 1200 : 2000,
    });

    const content = completion.choices[0].message.content;
    console.log('프롬프트', userPrompt);
    console.log('결과', content);
    console.log('🔍 content 타입:', typeof content);
    console.log('🔍 content 길이:', content?.length);
    const result = JSON.parse(content || '{}');

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '글 생성에 실패했습니다.' },
      { status: 500 },
    );
  }
}

function getSystemPrompt(template: string): string {
  const basePrompt = `당신은 기술 블로그 전문 작가입니다.
사용자가 제공한 주제와 키워드를 바탕으로 기술 블로그 글을 작성합니다.

🚨 **중요**: 실제 콘텐츠를 작성하세요. "마크다운 형식의 본문" 같은 placeholder 텍스트 사용 금지!

[글 작성 규칙]
1. 서론에서 독자의 관심을 끌어야 합니다
2. 본문에는 반드시 코드 예시를 포함합니다
3. 코드 블록은 적절한 언어 태그를 붙입니다 (\`\`\`javascript 등)
4. 전문 용어는 쉽게 풀어서 설명합니다
5. 결론에서 핵심 내용을 요약합니다
6. 코드 예시 반드시 포함하세요
7. 글자수는 코드 예시 제외합니다.
8. 글자수 꼭 지키세요.
9. 코드블록 앞에 ":" 빼기
10. 섹션별로 소제목을 붙이기

[글 구조] (섹션명은 **절대** 출력하지 마세요. 코드 예시 반드시 포함하세요)
1. 제목: SEO에 최적화된 매력적인 제목
2. 서론: 주제 소개 및 학습 동기 (2-3문단)
3. 본문: 핵심 내용 설명, 코드 예시 포함 (3-5섹션)
4. 결론: 요약 및 추가 학습 방향

[톤 앤 매너 가이드]
friendly:" **친근한 톤** 
  - 따뜻하고 정중함
  - "함께", "도움이 되셨길", "공동의 관심사"  
  - 이모지 적당히 사용
  - 예: "이 기능 정말 편리하죠? 함께 살펴보겠습니다"
  "
professional: "**전문적 톤** 
  - 비즈니스 보고서처럼 객관적/논리적
  - "본 라이브러리는", "구현 방법은", "권장사항은"
  - 수동태 위주, 감정 표현 없음
  - 예: "Zustand는 경량화된 상태 관리 솔루션으로..."
"
casual: "**캐주얼 톤** 
  - 친구한테 말하듯 직설적
  - "진짜", "완전", "헐", "미쳤음"
  - 강한 주장: "난 무조건 이거!", "이거 아니면 후회함"
  - 예: "zustand 써보니까 완전 편해져서 놀랐음 "
  "

응답은 **오직 JSON만** 반환하세요. 마크다운, 설명, 코드블록 절대 NO.
**응답 형식**:
{
  "title": "SEO에 최적화된 제목",
  "content": "**마크다운 형식**의 본문으로 생성",
  "hashtags": ["태그1", "태그2", "태그3"],
  "metaDescription": "SEO 메타 설명 (160자 이내)"
}
  다른 어떤 텍스트도 절대 추가하지 마세요. JSON만!
  
  응답 형식을 꼭 지켜주세요`;

  const templateGuides: Record<string, string> = {
    tutorial: `
    tutorial: 기술/라이브러리 사용법을 처음부터 끝까지 단계별로 설명할 때 사용
- 대상 독자: 개념은 알고 있지만 실사용 예제가 필요한 개발자
- content 구조 (*필수)
    - 제목*
        - 설명: 주제+핵심 이득이 들어나는 제목
    - 인트로
        - 설명: 문제 제기(왜 알아야하는지) + 글에서 다룰 내용 요약
        - 길이: 2~4문단
    - 사전 준비
        - 설명: 선행 지식, 필요 환경(React 버전, 언어 등)
        - 형식: 불릿 리스트
    - steps[]* (최소 2개 이상)
        - 설명: 튜토리얼의 각 단계
        - step 필드
            - 제목: “1. useState 기본 문법”과 같이 소제목 사용
            - 설명: 개념 설명, 왜 필요한지, 기본 형태
            - 코드 예시: 코드 블록 1개 이상
            - 참고(notes): 흔한 실수, 팁
    - 마무리*
        - 설명: 글에서 배운 내용 2~3문장으로 요약`,
    til: `
    TIL: 오늘늘 새로 알게 된 지식이나 인사이트 짧고 솔직하게 기록
- 대상 독자: 나 자신, 팀원, 가볍게 읽는 개발자
- content 구조 (*필수)
    - 제목*
        - 설명: “[TIL] 키워드” 형태
    - 날짜*
        - 설명: 학습한 날짜
    - 학습 주제*
        - 설명: 학습 주제 제목
    - 핵심 내용*
        - 설명: 핵심 내용 정리
        - 형식: 불릿 리스트나 짧은 문단
    - 코드 예시*
        - 설명: 관련 코드 예시를 주석으로 설명과 함께 작성
    - 느낀 점*
        - 설명: 느낀 점, 앞으로 어떻게 적용할지, 주의할 점
        - 길이: 1~2문단`,
    troubleShooting: `
    Trouble Shooting: 에러/버그가 발생한 상황과 해결 과정을 기록
- 대상 독자: 비슷한 문제를 만난 실무 개발자
- content 구조 (*필수)
    - 제목*
        - 설명: 상황 + 에러 요약이 드러나는 형태
    - 환경
        - 설명: 프레임워크/버전/브라우저 등
        - 형식: 키-값 리스트
    - 문제 상황*
        - 설명: 어떤 증상이 발생했는지, 기대 결과 vs 실제 결과, 콘솔/로그에 찍힌 에러 메시지
    - 원인 분석*
        - 설명: 원인을 찾기까지의 추론 과정, 잘못 짚은 가설도 같이
    - 해결 방법*
        - 설명: 실제로 적용한 해결 단계
        - step 필드
            - 제목
            - action: 무슨 조치를 했는지
            - codeChange: 수정한 코드(전/후 비교)
            - 결과
    - 결론*
        - 설명: 이번 문제를 통해 얻은 인사이트, 재발 방지 팁`,
  };

  return basePrompt + (templateGuides[template] || templateGuides.tutorial);
}
