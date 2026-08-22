'use client';

import { useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';

type Locale = 'en' | 'ko';
type Mode = 'info' | 'play' | null;
type Localized = Record<Locale, string>;

const ui = {
  en: {
    choose: 'Choose an experience', gateTitle: <>Meet <em>SeoKyoung Kim.</em><br />Choose your experience.</>,
    readCode: '01 / READ', readTitle: 'Information', readBody: 'A focused, content-rich CV and project archive.',
    playCode: '02 / PLAY', playTitle: 'Interactive', playBody: 'Move, click, and explore the same work differently.', enter: 'Enter ↗',
    startOver: 'Choose mode', profile: 'Profile', home: 'HOME', eng: 'Eng', kor: 'Kor', switchEnglish: 'Switch to English', switchKorean: '한국어로 변경',
    education: 'Education', internships: 'Internships', projects: 'Projects', activities: 'Activities', awards: 'Awards', skills: 'Skills', other: 'Other background', contact: 'Contact',
    current: 'AI undergraduate at Hanyang University ERICA', expected: 'Expected Feb. 2027', completed: 'Completed Feb. 2025',
    intro: 'I study Artificial Intelligence at Hanyang University ERICA. My work includes autonomous driving, industrial anomaly detection, and vehicle monitoring.',
    infoHint: 'A factual record of study, work, and things I have built.', live: 'Live site ↗', source: 'GitHub ↗',
    playKicker: 'MOVE · CLICK · DISCOVER', playTitleMain: <>One person,<br /><em>many coordinates.</em></>,
    playIntro: 'Explore the same portfolio through the subjects, projects, and roles that connect my work.', orbitHint: 'Choose a coordinate', selectedSignal: 'Selected signal',
    selectedProjects: 'Project signals', tiltHint: 'Move across the cards', playFacts: 'A few fixed points',
    facts: ['3 AI internships', '2 engineering degrees', '4 selected awards'],
    footer: 'SeoKyoung Kim. · AI Portfolio · 2026',
  },
  ko: {
    choose: '경험할 방식을 선택하세요', gateTitle: <>김서경을 어떤 방식으로<br /><em>알아보고 싶나요?</em></>,
    readCode: '01 / 읽기', readTitle: '정보', readBody: '이력과 프로젝트를 차분하고 촘촘하게 읽는 버전입니다.',
    playCode: '02 / 탐색', playTitle: '인터랙티브', playBody: '움직이고 누르며 같은 작업을 다르게 탐색하는 버전입니다.', enter: '들어가기 ↗',
    startOver: '모드 선택', profile: '프로필', home: 'HOME', eng: 'Eng', kor: 'Kor', switchEnglish: 'Switch to English', switchKorean: '한국어로 변경',
    education: '학력', internships: '인턴십', projects: '프로젝트', activities: '활동', awards: '수상', skills: '기술', other: '다른 경험', contact: '연락처',
    current: '한양대학교 ERICA 인공지능학과 학부생', expected: '2027년 2월 졸업 예정', completed: '2025년 2월 졸업',
    intro: '한양대학교 ERICA에서 인공지능을 공부하고 있습니다. 자율주행, 산업 이상 탐지, 차량 모니터링 작업을 해왔습니다.',
    infoHint: '공부한 것, 일한 곳, 직접 만든 것을 사실대로 정리했습니다.', live: '사이트 보기 ↗', source: '깃허브 ↗',
    playKicker: '움직이고 · 누르고 · 발견하기', playTitleMain: <>한 사람을 이루는<br /><em>여러 개의 좌표.</em></>,
    playIntro: '관심 분야, 프로젝트, 활동 사이의 연결을 따라 같은 포트폴리오를 새롭게 탐색해보세요.', orbitHint: '좌표를 선택하세요', selectedSignal: '선택한 신호',
    selectedProjects: '프로젝트 신호', tiltHint: '카드 위에서 움직여보세요', playFacts: '변하지 않는 몇 가지',
    facts: ['AI 인턴십 3회', '공학 학사 과정 2개', '주요 수상 4건'],
    footer: '김서경 · AI 포트폴리오 · 2026',
  },
};

const education: Array<{ date: string; degree: Localized; school: string; status: Localized }> = [
  { date: 'MAR 2025—FEB 2027', degree: { en: 'B.S. in Artificial Intelligence', ko: '인공지능학과 학사' }, school: 'Hanyang University ERICA', status: { en: 'Expected Feb. 2027', ko: '2027년 2월 졸업 예정' } },
  { date: 'MAR 2023—FEB 2025', degree: { en: 'B.S. in Computer and Information Communication Engineering', ko: '컴퓨터정보통신공학과 학사' }, school: 'Daejeon University', status: { en: 'Completed Feb. 2025', ko: '2025년 2월 졸업' } },
];

const experience: Array<{ date: string; company: string; role: Localized; detail: Localized }> = [
  { date: 'JAN—FEB 2026', company: 'HCNC', role: { en: 'AI Intern', ko: 'AI 인턴' }, detail: { en: 'Researched vision anomaly detection for steel and H-beam surfaces, public defect datasets, ensemble meta-models, automated labeling, and MLOps operation strategies.', ko: '철강·H빔 표면 결함을 위한 비전 이상 탐지, 공개 결함 데이터셋, 앙상블 메타 모델, 자동 라벨링과 MLOps 운영 전략을 조사했습니다.' } },
  { date: 'JUL—AUG 2025', company: 'HCNC', role: { en: 'AI Intern', ko: 'AI 인턴' }, detail: { en: 'Studied visual inspection and anomaly detection for manufacturing, industrial data characteristics, synthetic data, and capstone system planning.', ko: '제조업 비전 검사와 이상 탐지, 산업 데이터의 특성, 합성 데이터, 캡스톤 시스템 기획을 학습했습니다.' } },
  { date: 'JAN—FEB 2025', company: 'Molpaxbio', role: { en: 'AI Intern', ko: 'AI 인턴' }, detail: { en: 'Worked with medical image preprocessing, AI-based medical video classification and anomaly detection experiments, and CES exhibition preparation.', ko: '의료 영상 전처리, AI 기반 의료 영상 분류·이상 탐지 실험과 CES 전시 준비에 참여했습니다.' } },
];

const projects: Array<{ number: string; date: string; title: Localized; detail: Localized; tags: string[]; href?: string }> = [
  { number: '01', date: '2025—2026', title: { en: 'Industrial Anomaly Detection', ko: '산업 이상 탐지' }, detail: { en: 'Developed an automated image preprocessing and labeling pipeline, plus an MLOps application for training, deployment, and visualization.', ko: '이미지 데이터 전처리·라벨링 파이프라인과 학습, 배포, 시각화를 위한 MLOps 애플리케이션을 개발했습니다.' }, tags: ['Computer Vision', 'MLOps'] },
  { number: '02', date: '2025', title: { en: 'Autonomous Driving RC Car', ko: '자율주행 RC카' }, detail: { en: 'Implemented ROS2 lane detection and YOLOv8 vehicle detection and avoidance, including lane-change verification and ONNX inference.', ko: 'ROS2 차선 인식과 YOLOv8 차량 탐지·회피를 구현하고, 차선 변경 완료 검증과 ONNX 추론을 적용했습니다.' }, tags: ['ROS2', 'YOLOv8', 'ONNX'] },
  { number: '03', date: '2026', title: { en: 'Intersection Vehicle Counter', ko: '교차로 차량 계수 시스템' }, detail: { en: 'Built a YOLO, BoT-SORT, and ReID video system for vehicle detection, tracking, directional counting, and CSV visualization.', ko: 'YOLO, BoT-SORT, ReID를 활용해 차량 탐지·추적·방향별 계수와 CSV 시각화를 제공하는 영상 시스템을 만들었습니다.' }, tags: ['YOLO', 'BoT-SORT', 'Dashboard'], href: 'https://intersection-vehicle-counter-dashbo.vercel.app/' },
];

const activities: Array<{ date: string; title: Localized; detail: Localized }> = [
  { date: '2025—2026', title: { en: 'Hanyang ERICA RC Center mentor & competition organizer', ko: '한양대학교 ERICA RC 센터 멘토·대회 운영' }, detail: { en: 'Served as an RC Center mentor and helped organize the university’s first autonomous driving competition.', ko: 'RC 센터 멘토로 활동하고 교내 첫 자율주행 경진대회를 운영했습니다.' } },
  { date: '2026', title: { en: 'LG Innotek AX Expert Training Program assistant', ko: 'LG이노텍 AX 전문가 양성 과정 조교' }, detail: { en: 'Supported Python, data analysis, machine learning practice, debugging, and lab environment setup.', ko: 'Python, 데이터 분석, 머신러닝 실습, 디버깅과 실습 환경 구성을 지원했습니다.' } },
  { date: '2026', title: { en: 'NusB academic committee member', ko: 'NusB 학술위원' }, detail: { en: 'Reviewed and presented neuroscience papers on neural replay, memory, and predictive brain mechanisms.', ko: '신경 리플레이, 기억, 예측적 뇌 메커니즘 관련 논문을 검토하고 발표했습니다.' } },
];

const awards: Array<{ year: string; event: Localized; result: Localized }> = [
  { year: '2026', event: { en: 'Hanyang ERICA Software Convergence Capstone Design', ko: '한양대학교 ERICA 소프트웨어융합대학 캡스톤디자인 경진대회' }, result: { en: 'Excellence Award', ko: '최우수상' } },
  { year: '2025', event: { en: 'Volkswagen Group Korea SEA:ME Hackathon', ko: '폭스바겐우리재단 씨:미 해커톤' }, result: { en: 'Excellence Award', ko: '최우수상' } },
  { year: '2025', event: { en: '8th Kookmin University Autonomous Driving Competition', ko: '제8회 국민대학교 자율주행 경진대회' }, result: { en: '3rd Place', ko: '3위' } },
  { year: '2024', event: { en: 'Autonomous Vehicle Competition, Daejeon University', ko: '대전대학교 자율주행 자동차 경진대회' }, result: { en: 'Grand Prize', ko: '대상' } },
];

const skillGroups = [
  ['Language', 'Python · C++'], ['Machine Learning / AI', 'PyTorch · OpenCV · YOLO'], ['MLOps & Tools', 'Git/GitHub · ONNX · MLflow · Google Cloud'],
  ['Robotics & Embedded', 'ROS2 · rclcpp · rclpy · Sensor integration'], ['Web', 'Next.js · React · TypeScript · Vercel'], ['Collaboration', 'Notion · Slack'],
];

const playTopics: Array<{ key: string; label: Localized; code: string; title: Localized; body: Localized }> = [
  { key: 'vision', code: '01', label: { en: 'VISION', ko: '비전' }, title: { en: 'Seeing industrial and road scenes', ko: '산업 현장과 도로 장면을 보는 기술' }, body: { en: 'Surface-defect inspection, medical image preprocessing, and vehicle detection are the recurring vision problems in my work.', ko: '표면 결함 검사, 의료 영상 전처리, 차량 탐지는 제가 반복해서 다뤄온 비전 문제입니다.' } },
  { key: 'robotics', code: '02', label: { en: 'ROBOTICS', ko: '로보틱스' }, title: { en: 'Perception connected to motion', ko: '인지에서 움직임까지' }, body: { en: 'With ROS2, YOLOv8, and ONNX, I built lane perception, vehicle avoidance, and lane-change verification for an RC car.', ko: 'ROS2, YOLOv8, ONNX로 RC카의 차선 인식, 차량 회피, 차선 변경 완료 검증을 구현했습니다.' } },
  { key: 'mlops', code: '03', label: { en: 'MLOPS', ko: 'MLOPS' }, title: { en: 'From data preparation to operation', ko: '데이터 준비부터 운영까지' }, body: { en: 'My anomaly-detection project connects preprocessing, labeling, training, deployment, visualization, and monitoring strategies.', ko: '이상 탐지 프로젝트에서 전처리, 라벨링, 학습, 배포, 시각화와 모니터링 전략을 연결했습니다.' } },
  { key: 'people', code: '04', label: { en: 'PEOPLE', ko: '사람' }, title: { en: 'Learning by helping others learn', ko: '다른 사람의 배움을 도우며 배우기' }, body: { en: 'I have mentored RC teams, organized a competition, supported manufacturing AI training, and reviewed neuroscience papers with a student committee.', ko: 'RC 팀 멘토링, 대회 운영, 제조업 AI 교육 지원, 학생 학술위원회 논문 검토를 경험했습니다.' } },
];

function LocaleSwitcher({ locale, setLocale, inverse = false }: { locale: Locale; setLocale: (locale: Locale) => void; inverse?: boolean }) {
  const t = ui[locale];
  return <div className={`locale-switcher${inverse ? ' inverse' : ''}`} aria-label="Language">
    <button className={locale === 'en' ? 'active' : ''} type="button" aria-label={t.switchEnglish} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}><span aria-hidden="true">🇺🇸</span><small>{t.eng}</small></button>
    <button className={locale === 'ko' ? 'active' : ''} type="button" aria-label={t.switchKorean} aria-pressed={locale === 'ko'} onClick={() => setLocale('ko')}><span aria-hidden="true">🇰🇷</span><small>{t.kor}</small></button>
  </div>;
}

function CategoryBar({ locale, setLocale, reset, inverse = false }: { locale: Locale; setLocale: (locale: Locale) => void; reset: () => void; inverse?: boolean }) {
  return <header className={`category-bar${inverse ? ' inverse' : ''}`}>
    <button className="home-button" type="button" onClick={reset}>HOME</button>
    <strong>SeoKyoung Kim.</strong>
    <LocaleSwitcher locale={locale} setLocale={setLocale} inverse={inverse} />
  </header>;
}

function ModeGate({ locale, setLocale, choose }: { locale: Locale; setLocale: (locale: Locale) => void; choose: (mode: Exclude<Mode, null>) => void }) {
  const t = ui[locale];
  return <main className="mode-gate">
    <div className="mode-gate-top"><a className="brand" href="#">SK<span>°</span></a><div><span>PORTFOLIO · 2026</span><LocaleSwitcher locale={locale} setLocale={setLocale} /></div></div>
    <div className="mode-gate-copy"><p>{t.choose}</p><h1>{t.gateTitle}</h1></div>
    <div className="mode-options">
      <button className="mode-option mode-option-info" onClick={() => choose('info')}>
        <span>{t.readCode}</span><span className="option-preview">Aa<br /><i>CV / ARCHIVE</i></span><strong>{t.readTitle}</strong><p>{t.readBody}</p><b>{t.enter}</b>
      </button>
      <button className="mode-option mode-option-play" onClick={() => choose('play')}>
        <span>{t.playCode}</span><span className="option-orbit"><i /><i /><i /></span><strong>{t.playTitle}</strong><p>{t.playBody}</p><b>{t.enter}</b>
      </button>
    </div>
  </main>;
}

function CvSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section className="cv-section" id={id}><header><span>{number}</span><h2>{title}</h2></header>{children}</section>;
}

function InfoMode({ locale, setLocale, reset }: { locale: Locale; setLocale: (locale: Locale) => void; reset: () => void }) {
  const t = ui[locale];
  const localize = (value: Localized) => value[locale];
  return <main className="info-mode"><CategoryBar locale={locale} setLocale={setLocale} reset={reset} />
    <div className="cv-layout"><aside className="cv-sidebar">
      <div><a className="brand light-brand" href="#cv-top">SK<span>°</span></a><p>CURRICULUM<br />VITAE + WORK</p></div>
      <nav>{[['education', t.education], ['internships', t.internships], ['projects', t.projects], ['activities', t.activities], ['awards', t.awards], ['skills', t.skills]].map(([href, label]) => <a href={`#${href}`} key={href}>{label}</a>)}</nav>
      <div className="cv-side-bottom"><span>UPDATED AUG. 2026<br />© SEOKYOUNG KIM.</span></div>
    </aside>
    <article className="cv-document" id="cv-top">
      <header className="cv-hero"><p>{t.profile} / 2026</p><h1>SeoKyoung<br />Kim.</h1><div><strong>{t.current}</strong><span>{t.intro}</span></div></header>

      <CvSection id="education" number="01" title={t.education}>
        {education.map(item => <article className="cv-entry" key={item.date}><p className="cv-date">{item.date}</p><div><h3>{localize(item.degree)}</h3><strong>{item.school}</strong><p>{localize(item.status)}</p></div></article>)}
      </CvSection>

      <CvSection id="internships" number="02" title={t.internships}>
        {experience.map(item => <article className="cv-entry" key={item.date + item.company}><p className="cv-date">{item.date}</p><div><h3>{item.company} <em>— {localize(item.role)}</em></h3><p>{localize(item.detail)}</p></div></article>)}
      </CvSection>

      <CvSection id="projects" number="03" title={t.projects}>
        {projects.map(project => <article className="cv-entry project-entry" key={project.number}><p className="cv-date">{project.date}</p><div><h3>{localize(project.title)}</h3><p>{localize(project.detail)}</p><div className="inline-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.href && <a href={project.href} target="_blank" rel="noreferrer">{t.live}</a>}</div></article>)}
      </CvSection>

      <CvSection id="activities" number="04" title={t.activities}>
        {activities.map(item => <article className="cv-entry compact" key={item.title.en}><p className="cv-date">{item.date}</p><div><h3>{localize(item.title)}</h3><p>{localize(item.detail)}</p></div></article>)}
      </CvSection>

      <CvSection id="awards" number="05" title={t.awards}>
        <div className="cv-awards">{awards.map(item => <article key={item.event.en}><span>{item.year}</span><h3>{localize(item.event)}</h3><p>{localize(item.result)}</p></article>)}</div>
      </CvSection>

      <CvSection id="skills" number="06" title={t.skills}>
        <div className="skill-table">{skillGroups.map(([group, list]) => <div key={group}><strong>{group}</strong><span>{list}</span></div>)}</div>
      </CvSection>

      <CvSection id="other" number="07" title={t.other}>
        <div className="other-grid"><article><span>LANGUAGE</span><h3>TOEIC 935</h3><p>YBM · DEC. 2024</p></article><article><span>WORK</span><h3>{locale === 'en' ? 'Attraction operations · Store manager · Bartender' : '놀이시설 운영 · 매장 관리 · 바텐더'}</h3><p>2018—2020</p></article><article><span>SERVICE</span><h3>{locale === 'en' ? 'Specialized CBRN unit' : '화생방 특수임무 부대'}</h3><p>MAR. 2021—DEC. 2022</p></article></div>
      </CvSection>

      <footer className="cv-contact"><p>{t.contact}</p><h2>sk0829@hanyang.ac.kr</h2><div><a href="mailto:sk0829@hanyang.ac.kr">EMAIL ↗</a><a href="https://github.com/tjrud" target="_blank" rel="noreferrer">{t.source}</a></div></footer>
    </article></div>
  </main>;
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const move = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty('--ry', `${x * 10}deg`);
    event.currentTarget.style.setProperty('--rx', `${y * -10}deg`);
    event.currentTarget.style.setProperty('--gx', `${(x + .5) * 100}%`);
    event.currentTarget.style.setProperty('--gy', `${(y + .5) * 100}%`);
  };
  const reset = (event: ReactPointerEvent<HTMLElement>) => { event.currentTarget.style.setProperty('--ry', '0deg'); event.currentTarget.style.setProperty('--rx', '0deg'); };
  return <article className={`tilt-card ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</article>;
}

function PlayMode({ locale, setLocale, reset }: { locale: Locale; setLocale: (locale: Locale) => void; reset: () => void }) {
  const t = ui[locale];
  const localize = (value: Localized) => value[locale];
  const [activeTopic, setActiveTopic] = useState(0);
  const pointer = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };
  const topic = playTopics[activeTopic];

  return <main className="play-mode" onPointerMove={pointer}>
    <CategoryBar locale={locale} setLocale={setLocale} reset={reset} inverse />
    <section className="play-hero" id="play-top"><div className="play-heading"><p>SEOKYOUNG KIM. · {t.playKicker}</p><h1>{t.playTitleMain}</h1><span>{t.playIntro}</span></div>
      <div className="constellation">
        <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
        {playTopics.map((item, index) => <button className={`orbit-node node-${index + 1}${activeTopic === index ? ' active' : ''}`} key={item.key} onClick={() => setActiveTopic(index)} aria-pressed={activeTopic === index}><i>{item.code}</i>{localize(item.label)}</button>)}
        <div className="signal-card" aria-live="polite"><p>{t.selectedSignal} / {topic.code}</p><h2>{localize(topic.title)}</h2><span>{localize(topic.body)}</span></div>
      </div>
    </section>

    <div className="skill-marquee" aria-hidden="true"><div>{[...skillGroups, ...skillGroups].map(([group], i) => <span key={`${group}-${i}`}>{group} <b>✦</b></span>)}</div></div>

    <section className="play-projects"><header><p>{t.selectedProjects}</p><span>{t.tiltHint}</span></header><div className="play-project-grid">
      {projects.map((project, index) => <TiltCard className={`play-project project-${index + 1}`} key={project.number}><div><span>{project.number}</span><span>{project.date}</span></div><h2>{localize(project.title)}</h2><p>{localize(project.detail)}</p><footer><div>{project.tags.map(tag => <i key={tag}>{tag}</i>)}</div>{project.href && <a href={project.href} target="_blank" rel="noreferrer">↗</a>}</footer></TiltCard>)}
    </div></section>

    <section className="play-facts"><p>{t.playFacts}</p><div>{t.facts.map((fact, i) => <TiltCard key={fact}><span>0{i + 1}</span><h3>{fact}</h3></TiltCard>)}</div></section>

    <footer className="play-footer"><h2>sk0829<br />@hanyang.ac.kr</h2><div><span>{t.footer}</span><a href="mailto:sk0829@hanyang.ac.kr">EMAIL ↗</a><a href="#play-top">TOP ↑</a></div></footer>
  </main>;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>(null);
  const [locale, setLocale] = useState<Locale>('en');
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  if (mode === 'info') return <InfoMode locale={locale} setLocale={setLocale} reset={() => setMode(null)} />;
  if (mode === 'play') return <PlayMode locale={locale} setLocale={setLocale} reset={() => setMode(null)} />;
  return <ModeGate locale={locale} setLocale={setLocale} choose={setMode} />;
}
