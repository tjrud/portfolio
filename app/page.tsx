'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'ko';
type Localized = Record<Locale, string>;

const copy = {
  en: {
    work: 'Work', experience: 'Experience', about: 'About', talk: 'Email ↗', switchLabel: '한국어로 변경', switchText: 'KO',
    eyebrow: 'AI undergraduate · Hanyang University ERICA',
    title: <>Hi, I’m SeoKyoung.<br /><em>I study AI and build with it.</em></>,
    description: 'This portfolio documents my work in autonomous driving, industrial anomaly detection, and vehicle monitoring.',
    viewWork: 'View selected work', selectedWork: 'Selected work', projectPeriod: '2025—2026', visit: 'Live site ↗', caseStudy: 'Project',
    fieldExperience: 'Internships', experienceNote: 'Three AI internships · 2025—2026',
    profile: 'About me', profileNote: 'The path behind the projects',
    aboutTitle: 'My route into AI has not been a straight line.',
    aboutBody: 'I studied Computer and Information Communication Engineering at Daejeon University before moving to Artificial Intelligence at Hanyang University ERICA. Outside university, I have worked in attraction operations, hospitality management, bartending, and completed military service in a specialized CBRN unit. Those are part of my background, too.',
    email: 'Email ↗', github: 'GitHub ↗', aiDegree: 'B.S. in Artificial Intelligence', aiDate: 'Expected Feb. 2027',
    ciceDegree: 'B.S. in Computer and Information Communication Engineering', ciceDate: 'Completed Feb. 2025',
    researchFocus: 'Published research interests', researchTopics: 'Autonomous driving & flight · LLMs · Anomaly detection',
    activities: 'Beyond projects', activitiesNote: 'Roles that also describe me',
    toolbox: 'Skills', coreTech: 'Tools listed in my portfolio', recognition: 'Awards', selectedAwards: 'Four selected results',
    footerPrompt: 'Thank you for reading.', footerTitle: <>Let’s keep<br /><em>in touch.</em></>, backTop: 'Back to top ↑', copyright: '© 2026 SeoKyoung Kim',
  },
  ko: {
    work: '프로젝트', experience: '인턴십', about: '소개', talk: '이메일 ↗', switchLabel: 'Switch to English', switchText: 'EN',
    eyebrow: '한양대학교 ERICA 인공지능학과 학부생',
    title: <>안녕하세요, 김서경입니다.<br /><em>AI를 배우고 직접 만듭니다.</em></>,
    description: '자율주행, 산업 이상 탐지, 차량 모니터링 분야에서 공부하고 만든 작업을 정리했습니다.',
    viewWork: '주요 프로젝트 보기', selectedWork: '주요 프로젝트', projectPeriod: '2025—2026', visit: '사이트 보기 ↗', caseStudy: '프로젝트',
    fieldExperience: '인턴십', experienceNote: 'AI 인턴십 3회 · 2025—2026',
    profile: '나에 대해', profileNote: '프로젝트 뒤에 있는 과정',
    aboutTitle: 'AI까지 오는 길은 한 방향만은 아니었습니다.',
    aboutBody: '대전대학교에서 컴퓨터정보통신공학을 전공한 뒤 한양대학교 ERICA 인공지능학과로 옮겨 공부하고 있습니다. 학교 밖에서는 놀이시설 운영, 매장 관리, 바텐더 일을 경험했고 화생방 특수임무 부대에서 군 복무를 마쳤습니다. 이 경험들도 지금의 저를 설명하는 배경입니다.',
    email: '이메일 ↗', github: '깃허브 ↗', aiDegree: '인공지능학과 학사', aiDate: '2027년 2월 졸업 예정',
    ciceDegree: '컴퓨터정보통신공학과 학사', ciceDate: '2025년 2월 졸업',
    researchFocus: '공개 포트폴리오에 적은 관심 분야', researchTopics: '자율주행·비행 · LLM · 이상 탐지',
    activities: '프로젝트 밖의 활동', activitiesNote: '저를 보여주는 또 다른 역할',
    toolbox: '기술', coreTech: '공개 포트폴리오에 기재한 도구', recognition: '수상', selectedAwards: '주요 수상 4건',
    footerPrompt: '읽어주셔서 감사합니다.', footerTitle: <>계속<br /><em>연결되어요.</em></>, backTop: '맨 위로 ↑', copyright: '© 2026 김서경',
  },
};

const projects: Array<{ number: string; title: Localized; description: Localized; tags: string[]; href?: string }> = [
  {
    number: '01', title: { en: 'Industrial Anomaly Detection', ko: '산업 이상 탐지' },
    description: {
      en: 'Developed an automated image preprocessing and labeling pipeline, plus an MLOps application for training, deployment, and visualization.',
      ko: '이미지 데이터 전처리·라벨링 파이프라인과 학습, 배포, 시각화를 위한 MLOps 애플리케이션을 개발했습니다.',
    },
    tags: ['Computer Vision', 'MLOps', '2025—26'],
  },
  {
    number: '02', title: { en: 'Autonomous Driving RC Car', ko: '자율주행 RC카' },
    description: {
      en: 'Implemented ROS2 lane detection and YOLOv8 vehicle detection and avoidance, including lane-change verification and ONNX inference.',
      ko: 'ROS2 차선 인식과 YOLOv8 차량 탐지·회피를 구현하고, 차선 변경 완료 검증과 ONNX 추론을 적용했습니다.',
    },
    tags: ['ROS2', 'YOLOv8', 'ONNX'],
  },
  {
    number: '03', title: { en: 'Intersection Vehicle Counter', ko: '교차로 차량 계수 시스템' },
    description: {
      en: 'Built a YOLO, BoT-SORT, and ReID video system for vehicle detection, tracking, directional counting, and CSV visualization.',
      ko: 'YOLO, BoT-SORT, ReID를 활용해 차량 탐지·추적·방향별 계수와 CSV 시각화를 제공하는 영상 시스템을 만들었습니다.',
    },
    tags: ['YOLO', 'BoT-SORT', 'Dashboard'], href: 'https://intersection-vehicle-counter-dashbo.vercel.app/',
  },
];

const experience: Array<{ date: string; company: string; role: Localized; detail: Localized }> = [
  {
    date: 'JAN—FEB 2026', company: 'HCNC', role: { en: 'AI Intern', ko: 'AI 인턴' },
    detail: {
      en: 'Researched vision anomaly detection for steel and H-beam surfaces, public defect datasets, ensemble meta-models, automated labeling, and MLOps operation strategies.',
      ko: '철강·H빔 표면 결함을 위한 비전 이상 탐지, 공개 결함 데이터셋, 앙상블 메타 모델, 자동 라벨링과 MLOps 운영 전략을 조사했습니다.',
    },
  },
  {
    date: 'JUL—AUG 2025', company: 'HCNC', role: { en: 'AI Intern', ko: 'AI 인턴' },
    detail: {
      en: 'Studied visual inspection and anomaly detection for manufacturing, industrial data characteristics, synthetic data, and capstone system planning.',
      ko: '제조업 비전 검사와 이상 탐지, 산업 데이터의 특성, 합성 데이터, 캡스톤 시스템 기획을 학습했습니다.',
    },
  },
  {
    date: 'JAN—FEB 2025', company: 'Molpaxbio', role: { en: 'AI Intern', ko: 'AI 인턴' },
    detail: {
      en: 'Worked with medical image preprocessing, AI-based medical video classification and anomaly detection experiments, and CES exhibition preparation.',
      ko: '의료 영상 전처리, AI 기반 의료 영상 분류·이상 탐지 실험과 CES 전시 준비에 참여했습니다.',
    },
  },
];

const activities: Array<{ date: string; title: Localized; description: Localized }> = [
  {
    date: '2025—2026', title: { en: 'Mentor & competition organizer', ko: '멘토와 대회 운영자' },
    description: {
      en: 'Served as a Hanyang ERICA RC Center mentor and helped organize the university’s first autonomous driving competition.',
      ko: '한양대학교 ERICA RC 센터 멘토로 활동하고, 교내 첫 자율주행 경진대회를 운영했습니다.',
    },
  },
  {
    date: '2026', title: { en: 'Manufacturing AI training assistant', ko: '제조업 AI 교육 조교' },
    description: {
      en: 'Supported the LG Innotek AX Expert Training Program with Python, data analysis, machine learning practice, debugging, and lab setup.',
      ko: 'LG이노텍 AX 전문가 양성 과정에서 Python, 데이터 분석, 머신러닝 실습, 디버깅과 실습 환경 구성을 지원했습니다.',
    },
  },
  {
    date: '2026', title: { en: 'NusB academic committee member', ko: 'NusB 학술위원' },
    description: {
      en: 'Reviewed and presented neuroscience papers on neural replay, memory, and predictive brain mechanisms for the 65th National Undergraduate Symposium in Biology.',
      ko: '제65회 전국대학생생물학심포지엄 학술위원으로 신경 리플레이, 기억, 예측적 뇌 메커니즘 관련 논문을 검토하고 발표했습니다.',
    },
  },
];

const awards: Array<[string, Localized, Localized]> = [
  ['2026', { en: 'Hanyang ERICA Software Convergence Capstone Design', ko: '한양대학교 ERICA 소프트웨어융합대학 캡스톤디자인 경진대회' }, { en: 'Excellence Award', ko: '최우수상' }],
  ['2025', { en: 'Volkswagen Group Korea SEA:ME Hackathon', ko: '폭스바겐우리재단 씨:미 해커톤' }, { en: 'Excellence Award', ko: '최우수상' }],
  ['2025', { en: '8th Kookmin University Autonomous Driving Competition', ko: '제8회 국민대학교 자율주행 경진대회' }, { en: '3rd Place', ko: '3위' }],
  ['2024', { en: 'Autonomous Vehicle Competition, Daejeon University', ko: '대전대학교 자율주행 자동차 경진대회' }, { en: 'Grand Prize', ko: '대상' }],
];

const skills = ['Python', 'C++', 'PyTorch', 'OpenCV', 'YOLO', 'ROS2', 'ONNX', 'MLflow', 'Google Cloud', 'Next.js', 'React', 'TypeScript'];

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en');
  const t = copy[locale];
  const localize = (value: Localized) => value[locale];

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <main lang={locale}>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Go to top">SK<span>°</span></a>
        <div className="nav-links">
          <a href="#work">{t.work}</a><a href="#experience">{t.experience}</a><a href="#about">{t.about}</a>
          <button className="locale-toggle" type="button" aria-label={t.switchLabel} onClick={() => setLocale(locale === 'en' ? 'ko' : 'en')}>{t.switchText}</button>
          <a href="mailto:sk0829@hanyang.ac.kr" className="nav-cta">{t.talk}</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="pulse" /> {t.eyebrow}</div>
        <h1>{t.title}</h1>
        <div className="hero-bottom"><p>{t.description}</p><a href="#work" className="round-link" aria-label={t.viewWork}>↓</a></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head"><p>{t.selectedWork}</p><p>{t.projectPeriod}</p></div>
        <div className="project-grid">
          {projects.map((project) => {
            const Card = project.href ? 'a' : 'article';
            return <Card className="project-card" key={project.number} {...(project.href ? { href: project.href, target: '_blank', rel: 'noreferrer' } : {})}>
              <div className="project-top"><span>{project.number}</span><span>{project.href ? t.visit : t.caseStudy}</span></div>
              <div><h2>{localize(project.title)}</h2><p>{localize(project.description)}</p></div>
              <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </Card>;
          })}
        </div>
      </section>

      <section className="experience" id="experience"><div className="shell">
        <div className="section-head light"><p>{t.fieldExperience}</p><p>{t.experienceNote}</p></div>
        <div className="timeline">{experience.map((item, i) => <article className="timeline-row" key={item.date + item.company}>
          <span className="timeline-index">0{i + 1}</span><p className="timeline-date">{item.date}</p>
          <div><h3>{item.company}</h3><p className="role">{localize(item.role)}</p></div><p className="timeline-detail">{localize(item.detail)}</p>
        </article>)}</div>
      </div></section>

      <section className="about shell" id="about">
        <div className="section-head"><p>{t.profile}</p><p>{t.profileNote}</p></div>
        <div className="about-grid">
          <div className="about-copy"><h2>{t.aboutTitle}</h2><p>{t.aboutBody}</p>
            <div className="contact-links"><a href="mailto:sk0829@hanyang.ac.kr">{t.email}</a><a href="https://github.com/tjrud" target="_blank" rel="noreferrer">{t.github}</a></div>
          </div>
          <div className="study-stack">
            <article><p>{t.aiDate}</p><h3>{t.aiDegree}</h3><span>Hanyang University ERICA · Mar. 2025—Feb. 2027</span></article>
            <article><p>{t.ciceDate}</p><h3>{t.ciceDegree}</h3><span>Daejeon University · Mar. 2023—Feb. 2025</span></article>
            <article className="interest-card"><p>{t.researchFocus}</p><h3>{t.researchTopics}</h3></article>
          </div>
        </div>
      </section>

      <section className="activities shell">
        <div className="section-head"><p>{t.activities}</p><p>{t.activitiesNote}</p></div>
        <div className="activity-grid">{activities.map((item) => <article key={item.title.en}>
          <p>{item.date}</p><h3>{localize(item.title)}</h3><span>{localize(item.description)}</span>
        </article>)}</div>
      </section>

      <section className="skills shell" aria-label={t.toolbox}><div className="section-head"><p>{t.toolbox}</p><p>{t.coreTech}</p></div>
        <div className="skill-list">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
      </section>

      <section className="recognition shell"><div className="section-head"><p>{t.recognition}</p><p>{t.selectedAwards}</p></div>
        <div className="award-list">{awards.map(([year, event, prize]) => <article key={event.en}><span>{year}</span><h3>{localize(event)}</h3><p>{localize(prize)}</p></article>)}</div>
      </section>

      <footer><div className="shell footer-inner">
        <div><p>{t.footerPrompt}</p><h2>{t.footerTitle}</h2></div>
        <a className="footer-mail" href="mailto:sk0829@hanyang.ac.kr">sk0829@hanyang.ac.kr ↗</a>
        <div className="footer-bottom"><span>{t.copyright}</span><a href="#top">{t.backTop}</a></div>
      </div></footer>
    </main>
  );
}
