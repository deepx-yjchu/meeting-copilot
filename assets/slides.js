// 슬라이드 본문. 순서대로 렌더된다.
const S = (title, html) => ({ title, html });

export const slides = [

  S("DEEPX Meeting Copilot", `
    <section class="slide l-cover">
      <div class="l-cover-rule"></div>
      <h1 class="l-cover-title">DEEPX Meeting Copilot</h1>
      <p class="l-cover-sub">공개 문서만 근거로 쓰는 미팅 브리핑 에이전트.<br>근거 없는 제품 문장은 모델이 아니라 코드가 막는다.</p>
      <div class="l-cover-meta">
        <div class="l-cover-meta-item"><span>기간</span><span>14일 × 하루 1시간</span></div>
        <div class="l-cover-meta-item"><span>스택</span><span>LangGraph · Claude · Chroma</span></div>
        <div class="l-cover-meta-item"><span>상태</span><span>2026-10 완료</span></div>
      </div>
    </section>`),

  S("문제", `
    <section class="slide l-statement">
      <div class="s-eyebrow">문제</div>
      <p class="l-statement-text">미팅 전에 제품 자료를 뒤져서 브리핑을 쓴다. 매번 같은 페이지를 다시 찾고, 숫자 하나 틀리면 미팅에서 들킨다.</p>
      <p class="l-statement-sub">챗봇에 물어보면 빠르다. 대신 근거 없는 문장이 섞여 들어오고, 그걸 걸러내는 건 결국 사람 몫이다. 그러면 처음부터 자료를 읽는 것과 뭐가 다른가.</p>
    </section>`),

  S("무엇을 만들었나", `
    <section class="slide">
      <div class="s-eyebrow">결과물</div>
      <h2 class="s-title">무엇을 만들었나</h2>
      <div class="s-body">
        <ul class="l-bullets-list">
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">고객사·목적·운영 조건을 JSON 으로 넣으면 브리핑 초안이 나온다</div></div></li>
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">제품 문장마다 인용이 붙고, <b>원문과 대조해 통과한 문장만</b> 남는다</div></div></li>
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">필수 조건이 비어 있으면 추천 대신 <b>질문을 돌려준다</b></div></div></li>
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">사람이 승인하거나, 문장을 고쳐서 다시 검증시킨다</div></div></li>
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">CLI 와 웹 UI 둘 다 있다. Docker 한 번으로 뜬다</div></div></li>
        </ul>
      </div>
    </section>`),

  S("목차", `
    <section class="slide">
      <div class="s-eyebrow">목차</div>
      <h2 class="s-title">다섯 가지만 본다</h2>
      <div class="s-body">
        <ol class="l-agenda-list">
          <li class="l-agenda-item"><span class="l-agenda-n">01</span><span class="l-agenda-title">왜 챗봇이 아닌가</span><span class="l-agenda-desc">답이 아니라 보증의 문제</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">02</span><span class="l-agenda-title">구조</span><span class="l-agenda-desc">6노드, LLM 호출은 2번</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">03</span><span class="l-agenda-title">검증</span><span class="l-agenda-desc">규칙 5개와 승인 루프</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">04</span><span class="l-agenda-title">결과</span><span class="l-agenda-desc">평가 6건, 챗봇과 비교</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">05</span><span class="l-agenda-title">정리</span><span class="l-agenda-desc">14일 기록과 배운 것</span></li>
        </ol>
      </div>
    </section>`),

  S("01 왜 챗봇이 아닌가", `
    <section class="slide l-divider">
      <div class="l-divider-n">01</div>
      <h2 class="l-divider-title">왜 챗봇이 아닌가</h2>
      <p class="l-divider-sub">챗봇의 문제는 답이 아니라 보증이다.</p>
    </section>`),

  S("챗봇이 못 하는 것", `
    <section class="slide">
      <div class="s-eyebrow">01 · 왜 챗봇이 아닌가</div>
      <h2 class="s-title">챗봇 답변은 그럴듯하다. 그럴듯한 게 문제다.</h2>
      <div class="s-body">
        <ul class="l-bullets-list">
          <li><span class="l-bullets-bar is-danger"></span><div><div class="l-bullets-text">"DX-M1 은 25 TOPS" 가 맞는지 확인하려면 결국 원문을 열어야 한다</div><div class="l-bullets-sub">인용이 붙어도 그 인용이 진짜 그 페이지에 있는 문장인지는 별개다</div></div></li>
          <li><span class="l-bullets-bar is-danger"></span><div><div class="l-bullets-text">조건을 안 물어본다. 카메라가 몇 대인지 모르면서 제품을 고른다</div><div class="l-bullets-sub">미팅에서 제일 많이 하는 일은 추천이 아니라 질문이다</div></div></li>
          <li><span class="l-bullets-bar is-danger"></span><div><div class="l-bullets-text">프롬프트에 "근거 없으면 말하지 마" 라고 써도 지켜진다는 보장이 없다</div><div class="l-bullets-sub">지켜지는지 확인하는 코드가 없으면 그냥 희망사항이다</div></div></li>
        </ul>
      </div>
    </section>`),

  S("핵심 결정", `
    <section class="slide l-statement">
      <div class="s-eyebrow">01 · 핵심 결정</div>
      <p class="l-statement-text">규칙은 프롬프트가 아니라 코드로 강제한다.</p>
      <p class="l-statement-sub">조건 확인, 인용 검증, 재작성 루프, 사람 승인 — 전부 LLM 바깥에서 돈다. LLM 은 분석과 초안만 쓴다. 이게 챗봇과의 차이고, 마지막에 같은 모델로 만든 챗봇 baseline 과 비교해서 증명한다.</p>
    </section>`),

  S("02 구조", `
    <section class="slide l-divider">
      <div class="l-divider-n">02</div>
      <h2 class="l-divider-title">구조</h2>
      <p class="l-divider-sub">6노드 그래프. LLM 호출은 두 번뿐이다.</p>
    </section>`),

  S("6노드 그래프", `
    <section class="slide">
      <div class="s-eyebrow">02 · 구조</div>
      <h2 class="s-title">6노드 그래프</h2>
      <div class="s-body">
        <div class="g-flow">
          <div class="g-flow-box"><div class="g-flow-label">intake</div><div class="g-flow-sub">코드. 조건 비면 끝</div></div>
          <div class="g-flow-arrow">→</div>
          <div class="g-flow-box is-violet"><div class="g-flow-label">retrieve</div><div class="g-flow-sub">Chroma. top-8 청크</div></div>
          <div class="g-flow-arrow">→</div>
          <div class="g-flow-box is-accent"><div class="g-flow-label">analyze_fit</div><div class="g-flow-sub">LLM. 구조화 출력</div></div>
          <div class="g-flow-arrow">→</div>
          <div class="g-flow-box is-accent"><div class="g-flow-label">draft_brief</div><div class="g-flow-sub">LLM. Citations 초안</div></div>
          <div class="g-flow-arrow">→</div>
          <div class="g-flow-box is-warn"><div class="g-flow-label">validate</div><div class="g-flow-sub">코드. 규칙 5개</div></div>
          <div class="g-flow-arrow">→</div>
          <div class="g-flow-box is-ok"><div class="g-flow-label">human_review</div><div class="g-flow-sub">interrupt. 사람이 결정</div></div>
        </div>
        <div class="g-flow-note"><b>파란 칸 두 개만 LLM 이다.</b> 나머지는 전부 코드. validate 에서 막히면 draft_brief 로 한 번 돌아가고, 그래도 남으면 사람 앞에서 멈춘다.</div>
      </div>
    </section>`),

  S("스택", `
    <section class="slide">
      <div class="s-eyebrow">02 · 구조</div>
      <h2 class="s-title">스택</h2>
      <div class="s-body">
        <table class="l-table">
          <thead><tr><th>역할</th><th>선택</th><th>왜</th></tr></thead>
          <tbody>
            <tr><td>LLM</td><td><code>claude-opus-5-5</code> 분석·초안 / <code>claude-sonnet-5-5</code> judge</td><td>구조화 출력(<code>messages.parse</code>)과 Citations 가 필요했다</td></tr>
            <tr><td>임베딩</td><td>Voyage <code>voyage-4</code>, 1024차원</td><td>document / query 를 구분해서 넣는다</td></tr>
            <tr><td>벡터 DB</td><td>Chroma 1.5.9, Docker 서버 모드</td><td>로컬 파일 모드도 되지만 서버가 재현이 쉽다</td></tr>
            <tr><td>그래프</td><td>LangGraph 1.2 + SqliteSaver + interrupt</td><td>조건 분기·멈춤·재개가 다 필요했다</td></tr>
            <tr><td>서버 / UI</td><td>FastAPI + SSE, 빌드 없는 vanilla JS</td><td>진행 상황을 스트리밍으로 보여주려고</td></tr>
            <tr><td>실행</td><td>uv · Docker compose · Makefile</td><td><code>make web</code> 한 줄로 뜬다</td></tr>
          </tbody>
        </table>
      </div>
    </section>`),

  S("코퍼스", `
    <section class="slide">
      <div class="s-eyebrow">02 · 구조</div>
      <h2 class="s-title">코퍼스는 작게, 전부 공개 페이지로</h2>
      <div class="s-body">
        <div class="l-stats-row">
          <div class="l-stat is-accent"><div class="l-stat-value">25</div><div class="l-stat-label">페이지</div><div class="l-stat-note">deepx.ai · developer.deepx.ai<br>제품 8 · 솔루션 5 · 기술 문서 12</div></div>
          <div class="l-stat"><div class="l-stat-value">193</div><div class="l-stat-label">청크</div><div class="l-stat-note">헤더 경계 + 토큰 상한으로 자른다</div></div>
          <div class="l-stat"><div class="l-stat-value">8</div><div class="l-stat-label">evidence / 요청</div><div class="l-stat-note">코사인 top-k. 리랭커 없음</div></div>
        </div>
      </div>
      <div class="s-foot">사내 문서는 안 썼다. 전부 공개 페이지라서 인용 URL 을 그대로 브리핑에 붙일 수 있다. 수집 스크립트는 두 사이트에서 544페이지를 받았고, 그중 25개만 색인했다.</div>
    </section>`),

  S("03 검증", `
    <section class="slide l-divider">
      <div class="l-divider-n">03</div>
      <h2 class="l-divider-title">검증</h2>
      <p class="l-divider-sub">supported 는 "규칙 통과" 지 "맞다" 가 아니다.</p>
    </section>`),

  S("검증 규칙 5개", `
    <section class="slide">
      <div class="s-eyebrow">03 · 검증</div>
      <h2 class="s-title">검증 규칙 5개</h2>
      <div class="s-body">
        <div class="l-rules">
          <div class="l-rule is-danger"><span class="l-rule-n">1</span><span class="l-rule-text">인용이 없다</span><span class="l-rule-tag is-danger">blocked</span></div>
          <div class="l-rule is-danger"><span class="l-rule-n">2</span><span class="l-rule-text">인용 문장이 청크 원문에 <b>실제로 없다</b></span><span class="l-rule-tag is-danger">blocked</span></div>
          <div class="l-rule is-danger"><span class="l-rule-n">3</span><span class="l-rule-text">숫자·단위·조건(INT8, Typical 같은 것)이 원문과 다르다</span><span class="l-rule-tag is-danger">blocked</span></div>
          <div class="l-rule is-warn"><span class="l-rule-n">4</span><span class="l-rule-text">제품·솔루션 페이지만 인용했다 — 마케팅 문장일 수 있다</span><span class="l-rule-tag is-warn">needs_review</span></div>
          <div class="l-rule is-danger"><span class="l-rule-n">5</span><span class="l-rule-text">필수 조건이 비어 있는데 <b>확정 표현</b>을 썼다</span><span class="l-rule-tag is-danger">blocked</span></div>
        </div>
      </div>
      <div class="s-foot">전부 문자열 대조다. LLM 한테 "이거 맞아?" 라고 묻지 않는다. 의미가 맞는지는 마지막에 사람이 본다.</div>
    </section>`),

  S("승인 루프", `
    <section class="slide">
      <div class="s-eyebrow">03 · 검증</div>
      <h2 class="s-title">막히면 한 번 고치고, 그래도 남으면 사람 앞에서 멈춘다</h2>
      <div class="s-body">
        <ul class="l-bullets-list">
          <li><span class="l-bullets-bar is-warn"></span><div><div class="l-bullets-text">validate 가 blocked 를 내면 draft_brief 로 돌아간다. <b>최대 1회.</b></div><div class="l-bullets-sub">무한 루프 방지. 두 번 고쳐도 안 되면 모델이 아니라 근거가 없는 거다</div></div></li>
          <li><span class="l-bullets-bar is-ok"></span><div><div class="l-bullets-text">그래도 남으면 human_review 에서 그래프가 멈춘다 (LangGraph interrupt)</div></div></li>
          <li><span class="l-bullets-bar is-ok"></span><div><div class="l-bullets-text">승인하거나, 문장을 고쳐서 revise 하면 <b>그 문장만</b> 다시 검증한다</div></div></li>
          <li><span class="l-bullets-bar"></span><div><div class="l-bullets-text">상태는 SQLite 체크포인트에 있다. 프로세스를 죽여도 이어서 한다</div></div></li>
        </ul>
      </div>
    </section>`),

  S("실제 입력과 출력", `
    <section class="slide">
      <div class="s-eyebrow">03 · 검증</div>
      <h2 class="s-title">실제로 돌리면 이렇게 나온다</h2>
      <div class="s-body">
        <div class="l-code"><i>// 입력 — 카메라 16대, FPS 와 모델은 모름</i>
{ "customer_name": "A 물류회사",
  "known_needs": ["안전모 착용 감지", "위험구역 침입 감지", "기존 CCTV 활용"],
  "conditions": { "camera_count": 16, "target_fps": <b>null</b>, "model": <b>null</b>, "host": "x86 게이트웨이" } }

<i>// 출력 brief.md — 제품은 보류, 질문부터</i>
<b>> 상태: 승인됨 · 제품 확정 보류 (필수 조건 미확인)</b>
## 3. 확인이 필요한 조건과 미팅 질문
1. 카메라 16대 각각에 필요한 목표 처리 속도(FPS)는 어느 수준인가요?
2. 안전모 착용 감지에 사용할 AI 모델이 정해져 있나요?
## 4. 적용 기회 가설
- 기존 CCTV 유지 + 가속기 탑재 서버 추가  <i>[hypothesis]</i>
  근거: "...by installing a server equipped with the DX-H1 Quattro
  to work with your existing CCTV system."  <i>← 원문 그대로, URL 포함</i></div>
      </div>
    </section>`),

  S("04 결과", `
    <section class="slide l-divider">
      <div class="l-divider-n">04</div>
      <h2 class="l-divider-title">결과</h2>
      <p class="l-divider-sub">평가 6건, 그리고 같은 모델로 만든 챗봇과 비교.</p>
    </section>`),

  S("평가", `
    <section class="slide">
      <div class="s-eyebrow">04 · 결과</div>
      <h2 class="s-title">평가 6건</h2>
      <div class="s-body">
        <div class="l-stats-row">
          <div class="l-stat is-ok"><div class="l-stat-value">6 / 6</div><div class="l-stat-label">승인 대기까지 도달</div><div class="l-stat-note">정상 검색 2, 숫자 검증 1, 조건 누락 2, 범위 밖 1</div></div>
          <div class="l-stat is-ok"><div class="l-stat-value">5 / 6</div><div class="l-stat-label">gold 통과</div><div class="l-stat-note">케이스마다 미리 적어둔 "반드시 지킬 것" 전부 만족</div></div>
          <div class="l-stat is-accent"><div class="l-stat-value">0</div><div class="l-stat-label">인용 없는 제품 문장</div><div class="l-stat-note">6건 전부. 규칙 1·2 가 다 걸렀다</div></div>
          <div class="l-stat"><div class="l-stat-value">63</div><div class="l-stat-label">테스트 통과</div><div class="l-stat-note">청킹·검색·그래프·검증·서버</div></div>
        </div>
      </div>
      <div class="s-foot">실패한 1건은 에이전트 잘못이 아니다. "미팅에서 FPS 를 확정합니다" 라는 다음 단계 문장을 평가 규칙이 제품 확정 표현으로 오탐했다. 규칙이 무딘 거라 그대로 뒀다.</div>
    </section>`),

  S("챗봇과 비교", `
    <section class="slide">
      <div class="s-eyebrow">04 · 결과</div>
      <h2 class="s-title">같은 모델, 같은 근거, 프롬프트 한 번 — 챗봇 baseline 과 비교</h2>
      <div class="s-body">
        <div class="l-cmp-grid">
          <div class="l-cmp-col is-warn">
            <div class="l-cmp-head">챗봇 baseline</div>
            <div class="l-cmp-sub">create_with_citations 한 번. 필터 없음</div>
            <ul class="l-cmp-list">
              <li><b>0.25</b> 인용 없거나 틀린 문장 / 실행</li>
              <li><b>10,073</b> 토큰 / 실행</li>
              <li><b>30초</b> / 실행</li>
            </ul>
          </div>
          <div class="l-cmp-col is-accent">
            <div class="l-cmp-head">에이전트</div>
            <div class="l-cmp-sub">6노드 + 규칙 5개 + 재작성</div>
            <ul class="l-cmp-list">
              <li><b>0</b> 인용 없거나 틀린 문장 / 실행</li>
              <li><b>23,147</b> 토큰 / 실행 (2.3배)</li>
              <li><b>98초</b> / 실행 (3.3배)</li>
            </ul>
          </div>
        </div>
        <div class="l-cmp-verdict">비용 2.3배, 시간 3배. 대신 근거 없는 문장이 0 이다. 미팅 브리핑 한 장에 2분 더 쓰는 건 싸다. 틀린 숫자 하나가 미팅에서 들키는 게 비싸다.</div>
      </div>
    </section>`),

  S("한계", `
    <section class="slide">
      <div class="s-eyebrow">04 · 결과</div>
      <h2 class="s-title">솔직하게, 안 되는 것</h2>
      <div class="s-body">
        <ul class="l-bullets-list">
          <li><span class="l-bullets-bar is-warn"></span><div><div class="l-bullets-text">코퍼스가 25페이지다. 실제로 쓰려면 수백 페이지에 갱신 주기가 필요하다</div></div></li>
          <li><span class="l-bullets-bar is-warn"></span><div><div class="l-bullets-text">supported ≠ 맞다. 규칙은 인용이 원문과 일치하는지만 본다</div><div class="l-bullets-sub">원문 자체가 마케팅 문장이면 그대로 통과한다. 그래서 규칙 4 가 있다</div></div></li>
          <li><span class="l-bullets-bar is-warn"></span><div><div class="l-bullets-text">baseline 직접 비교는 2케이스뿐이다. 통계적 의미는 없다</div></div></li>
          <li><span class="l-bullets-bar is-warn"></span><div><div class="l-bullets-text">실시간 웹 검색 백엔드(15~16일차)는 안 했다. 선택 항목이었고 시간이 없었다</div></div></li>
        </ul>
      </div>
    </section>`),

  S("05 정리", `
    <section class="slide l-divider">
      <div class="l-divider-n">05</div>
      <h2 class="l-divider-title">정리</h2>
      <p class="l-divider-sub">14일, 하루 1시간, PR 16건.</p>
    </section>`),

  S("14일 기록", `
    <section class="slide">
      <div class="s-eyebrow">05 · 정리</div>
      <h2 class="s-title">14일 기록</h2>
      <div class="s-body">
        <ol class="l-agenda-list">
          <li class="l-agenda-item"><span class="l-agenda-n">1–4</span><span class="l-agenda-title">코퍼스 · 청킹 · Chroma</span><span class="l-agenda-desc">HTML → Markdown → 청크 → 색인 → 검색</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">5–8</span><span class="l-agenda-title">그래프 · 구조화 출력 · Citations</span><span class="l-agenda-desc">intake 부터 draft_brief 까지</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">9–11</span><span class="l-agenda-title">검증 규칙 · 재작성 · 승인</span><span class="l-agenda-desc">규칙 5개, interrupt, resume</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">12–13</span><span class="l-agenda-title">평가 · baseline</span><span class="l-agenda-desc">케이스 6건, 챗봇과 비교</span></li>
          <li class="l-agenda-item"><span class="l-agenda-n">14 +</span><span class="l-agenda-title">README · 데모 · 웹 UI</span><span class="l-agenda-desc">FastAPI + SSE 는 덤으로 붙였다</span></li>
        </ol>
      </div>
      <div class="s-foot">기획서를 두 번 깎았다. 처음엔 크롤러·하이브리드 검색·리랭커까지 있었는데, 14시간 안에 끝나는 건 코어뿐이었다. 깎은 게 제일 잘한 결정이다.</div>
    </section>`),

  S("배운 것", `
    <section class="slide l-closing">
      <div class="s-eyebrow">05 · 정리</div>
      <h2 class="l-closing-title">배운 것</h2>
      <ol class="l-closing-points">
        <li><span class="n">1</span><span>에이전트와 챗봇의 차이는 모델이 아니라 모델 바깥의 코드다.</span></li>
        <li><span class="n">2</span><span>검증은 LLM 한테 시키지 않는다. 문자열 대조는 코드가 더 잘하고, 더 싸고, 매번 같다.</span></li>
        <li><span class="n">3</span><span>멈출 수 있는 그래프가 좋은 그래프다. interrupt 가 제일 중요한 노드였다.</span></li>
        <li><span class="n">4</span><span>평가 케이스를 먼저 쓰면 뭘 만들지가 정해진다. 반대로 하면 끝이 안 난다.</span></li>
      </ol>
      <div class="l-closing-foot">2026.09 – 2026.10 · <a href="https://github.com/deepx-yjchu" target="_blank" rel="noopener">github.com/deepx-yjchu</a></div>
    </section>`),
];
