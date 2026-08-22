'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'ko';
type Localized = Record<Locale, string>;

const copy = {
  en: {
    work: 'Work', experience: 'Experience', about: 'About', talk: 'Let’s talk ↗', switchLabel: '한국어로 변경', switchText: 'KO',
    eyebrow: 'AI Engineer · Seoul, KR', title: <>I build intelligence<br />for the <em>physical world.</em></>,
    description: 'Autonomous systems, computer vision, and production AI—designed to perceive, decide, and move in the real world.', viewWork: 'View selected work',
    selectedWork: 'Selected work', projectPeriod: '2025—2026', visit: 'Visit ↗', caseStudy: 'Case study',
    fieldExperience: 'Field experience', experienceNote: 'From research to production',
    profile: 'Profile', profileNote: 'Curious by design', aboutTitle: 'Engineering AI that holds up outside the lab.',
    aboutBody: 'I’m SeoKyoung Kim, an AI student and engineer focused on autonomy, perception, and deployable ML systems. I like the point where research meets noisy sensors, limited compute, and real users.',
    email: 'Email ↗', github: 'GitHub ↗', aiDegree: 'B.S. Artificial Intelligence', ciceDegree: 'Computer & Information Communication Engineering', researchFocus: 'Research focus', researchTopics: 'Autonomous systems · Multimodal LLMs · Anomaly detection',
    toolbox: 'Toolbox', coreTech: 'Core technologies', recognition: 'Recognition', selectedAwards: 'Selected awards', awardNote: 'Plus 15+ awards across deep-tech, ESG, startup, and community problem-solving competitions.',
    footerPrompt: 'Have an ambitious AI problem?', footerTitle: <>Let’s build<br /><em>what’s next.</em></>, backTop: 'Back to top ↑', copyright: '© 2026 SeoKyoung Kim',
  },
  ko: {
    work: '프로젝트', experience: '경력', about: '소개', talk: '연락하기 ↗', switchLabel: 'Switch to English', switchText: 'EN',
    eyebrow: 'AI 엔지니어 · 서울', title: <>현실 세계를 위한<br /><em>지능을 만듭니다.</em></>,
    description: '자율 시스템, 컴퓨터 비전, 프로덕션 AI를 통해 현실을 인식하고 판단하며 움직이는 기술을 만듭니다.', viewWork: '주요 프로젝트 보기',
    selectedWork: '주요 프로젝트', projectPeriod: '2025—2026', visit: '방문하기 ↗', caseStudy: '프로젝트',
    fieldExperience: '실무 경험', experienceNote: '연구에서 실제 적용까지',
    profile: '소개', profileNote: '호기심을 기술로', aboutTitle: '연구실 밖에서도 견고하게 작동하는 AI를 만듭니다.',
    aboutBody: '자율주행, 인지 기술, 배포 가능한 머신러닝 시스템에 집중하는 AI 전공자이자 엔지니어 김서경입니다. 센서 노이즈, 제한된 연산 자원, 실제 사용자가 만나는 지점에서 연구를 현실의 기술로 바꾸는 일을 좋아합니다.',
    email: '이메일 ↗', github: '깃허브 ↗', aiDegree: '인공지능학과 학사', ciceDegree: '컴퓨터정보통신공학과 학사', researchFocus: '연구 관심 분야', researchTopics: '자율 시스템 · 멀티모달 LLM · 이상 탐지',
    toolbox: '기술 스택', coreTech: '주요 기술', recognition: '수상', selectedAwards: '주요 수상 이력', awardNote: '딥테크, ESG, 창업 및 지역 문제 해결 분야에서 15회 이상 수상했습니다.',
    footerPrompt: '함께 해결할 AI 문제가 있나요?', footerTitle: <>다음 기술을<br /><em>함께 만듭니다.</em></>, backTop: '맨 위로 ↑', copyright: '© 2026 김서경',
  },
};

const projects: Array<{ number: string; title: Localized; description: Localized; tags: string[]; href?: string }> = [
  {
    number: '01', title: { en: 'Industrial Anomaly Detection', ko: '산업 이상 탐지 시스템' },
    description: { en: 'An end-to-end visual inspection workflow: image preprocessing, SAM-assisted labeling, ensemble anomaly scoring, training, deployment, and monitoring.', ko: '이미지 전처리, SAM 기반 라벨링, 앙상블 이상 점수, 학습·배포·모니터링을 연결한 엔드투엔드 비전 검사 워크플로입니다.' },
    tags: ['Computer Vision', 'MLOps', '2025—26'],
  },
  {
    number: '02', title: { en: 'Autonomous Driving RC Car', ko: '자율주행 RC카' },
    description: { en: 'ROS2 lane perception, YOLOv8 object avoidance, lane-change verification, and ONNX inference built for embedded real-time control.', ko: 'ROS2 차선 인식, YOLOv8 객체 회피, 차선 변경 검증, ONNX 추론을 임베디드 실시간 제어 환경에 구현했습니다.' },
    tags: ['ROS2', 'YOLOv8', 'Edge AI'],
  },
  {
    number: '03', title: { en: 'Intersection Vehicle Counter', ko: '교차로 차량 계수 시스템' },
    description: { en: 'A YOLO + BoT-SORT video analysis system for vehicle detection, tracking, and directional counting—even under occlusion and low light.', ko: 'YOLO와 BoT-SORT를 활용해 가림과 저조도 환경에서도 차량을 탐지·추적하고 방향별로 계수하는 영상 분석 시스템입니다.' },
    tags: ['Tracking', 'ReID', 'Dashboard'], href: 'https://intersection-vehicle-counter-dashbo.vercel.app/',
  },
];

const experience: Array<{ date: string; company: string; role: Localized; detail: Localized }> = [
  { date: 'JAN—FEB 2026', company: 'HCNC', role: { en: 'AI Research Intern', ko: 'AI 연구 인턴' }, detail: { en: 'Researched industrial surface-defect detection for steel and H-beams, ensemble meta-models, automated labeling, and MLOps retraining strategies.', ko: '철강 및 H빔 표면 결함 탐지, 앙상블 메타 모델, 자동 라벨링, MLOps 재학습 전략을 연구했습니다.' } },
  { date: 'JUL—AUG 2025', company: 'HCNC', role: { en: 'AI Intern', ko: 'AI 인턴' }, detail: { en: 'Studied real-world manufacturing data, anomaly detection, synthetic data generation, and production AI system design.', ko: '실제 제조 데이터의 특성, 이상 탐지, 합성 데이터 생성 및 프로덕션 AI 시스템 설계를 연구했습니다.' } },
  { date: 'JAN—FEB 2025', company: 'Molpaxbio', role: { en: 'AI Intern', ko: 'AI 인턴' }, detail: { en: 'Worked with digital pathology workflows, medical image preprocessing, video classification, and AI diagnostics during CES preparation.', ko: 'CES 준비 과정에서 디지털 병리 워크플로, 의료 영상 전처리, 영상 분류 및 AI 진단 기술을 다뤘습니다.' } },
];

const awards: Array<[string, Localized, Localized]> = [
  ['2026', { en: 'Hanyang ERICA Capstone Design', ko: '한양대학교 ERICA 캡스톤디자인 경진대회' }, { en: 'Grand Prize', ko: '최우수상' }],
  ['2025', { en: 'Volkswagen Group Korea SEA:ME Hackathon', ko: '폭스바겐그룹코리아 SEA:ME 해커톤' }, { en: 'Excellence Award', ko: '최우수상' }],
  ['2025', { en: 'Kookmin Univ. Autonomous Driving Competition', ko: '국민대학교 자율주행 경진대회' }, { en: '3rd Place', ko: '3위' }],
  ['2024', { en: 'Autonomous Vehicle Competition, Daejeon Univ.', ko: '대전대학교 자율주행 자동차 경진대회' }, { en: 'Grand Prize', ko: '대상' }],
];

const skills = ['Python', 'C++', 'PyTorch', 'OpenCV', 'YOLO', 'ROS2', 'ONNX', 'MLflow', 'Next.js', 'TypeScript', 'Google Cloud'];

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
            <article><p>2025—2027</p><h3>{t.aiDegree}</h3><span>Hanyang University ERICA</span></article>
            <article><p>2023—2025</p><h3>{t.ciceDegree}</h3><span>Daejeon University</span></article>
            <article className="interest-card"><p>{t.researchFocus}</p><h3>{t.researchTopics}</h3></article>
          </div>
        </div>
      </section>

      <section className="skills shell" aria-label={t.toolbox}><div className="section-head"><p>{t.toolbox}</p><p>{t.coreTech}</p></div>
        <div className="skill-list">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
      </section>

      <section className="recognition shell"><div className="section-head"><p>{t.recognition}</p><p>{t.selectedAwards}</p></div>
        <div className="award-list">{awards.map(([year, event, prize]) => <article key={event.en}><span>{year}</span><h3>{localize(event)}</h3><p>{localize(prize)}</p></article>)}</div>
        <p className="award-note">{t.awardNote}</p>
      </section>

      <footer><div className="shell footer-inner">
        <div><p>{t.footerPrompt}</p><h2>{t.footerTitle}</h2></div>
        <a className="footer-mail" href="mailto:sk0829@hanyang.ac.kr">sk0829@hanyang.ac.kr ↗</a>
        <div className="footer-bottom"><span>{t.copyright}</span><a href="#top">{t.backTop}</a></div>
      </div></footer>
    </main>
  );
}
