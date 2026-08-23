'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';

type Locale = 'en' | 'ko';
type Mode = 'info' | 'play' | null;
type Localized = Record<Locale, string>;
type DetailLevel = 0 | 1 | 2;

const ui = {
  en: {
    choose: 'Portfolio · 2026', gateTitle: <>Hi, I’m<br /><em>SeoKyoung Kim.</em></>,
    readCode: '01', readTitle: 'Information', readBody: 'CV, projects, and experience.',
    playCode: '02', playTitle: 'Interactive', playBody: 'Move, click, and explore.', enter: 'Open ↗',
    startOver: 'Choose mode', profile: 'Profile', home: 'HOME', eng: 'Eng', kor: 'Kor', switchEnglish: 'Switch to English', switchKorean: '한국어로 변경',
    education: 'Education', internships: 'Internships', projects: 'Projects', activities: 'Activities', awards: 'Awards', skills: 'Skills', other: 'Other background', contact: 'Contact',
    current: 'AI undergraduate at Hanyang University ERICA', expected: 'Expected Feb. 2027', completed: 'Completed Feb. 2025',
    intro: 'I study Artificial Intelligence at Hanyang University ERICA. My work includes autonomous driving, industrial anomaly detection, and vehicle monitoring.',
    infoHint: 'A factual record of study, work, and things I have built.', live: 'Live site ↗', source: 'GitHub ↗',
    playKicker: 'SELECTED WORK', playTitleMain: <>Projects and<br /><em>interests.</em></>,
    playIntro: 'A different way to browse what I have worked on.', orbitHint: 'Choose a topic', selectedSignal: 'Topic',
    selectedProjects: 'Projects', tiltHint: 'Move across the cards', playFacts: 'At a glance',
    facts: ['3 AI internships', '1 engineering degree', '4 selected awards'],
    footer: 'SeoKyoung Kim. · AI Portfolio · 2026',
  },
  ko: {
    choose: '포트폴리오 · 2026', gateTitle: <>안녕하세요,<br /><em>김서경입니다.</em></>,
    readCode: '01', readTitle: '정보', readBody: '이력, 프로젝트, 경험.',
    playCode: '02', playTitle: '인터랙티브', playBody: '움직이고 누르며 탐색합니다.', enter: '열기 ↗',
    startOver: '모드 선택', profile: '프로필', home: 'HOME', eng: 'Eng', kor: 'Kor', switchEnglish: 'Switch to English', switchKorean: '한국어로 변경',
    education: '학력', internships: '인턴십', projects: '프로젝트', activities: '활동', awards: '수상', skills: '기술', other: '다른 경험', contact: '연락처',
    current: '한양대학교 ERICA 인공지능학과 학부생', expected: '2027년 2월 졸업 예정', completed: '2025년 2월 졸업',
    intro: '한양대학교 ERICA에서 인공지능을 공부하고 있습니다. 자율주행, 산업 이상 탐지, 차량 모니터링 작업을 해왔습니다.',
    infoHint: '공부한 것, 일한 곳, 직접 만든 것을 사실대로 정리했습니다.', live: '사이트 보기 ↗', source: '깃허브 ↗',
    playKicker: '주요 작업', playTitleMain: <>프로젝트와<br /><em>관심 분야.</em></>,
    playIntro: '제가 해온 작업을 다른 방식으로 살펴봅니다.', orbitHint: '주제를 선택하세요', selectedSignal: '주제',
    selectedProjects: '프로젝트', tiltHint: '카드 위에서 움직여보세요', playFacts: '한눈에 보기',
    facts: ['AI 인턴십 3회', '공학 학사 1개', '주요 수상 4건'],
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

const sourceEducation = [
  { title: 'B.S. in Artificial Intelligence (Expected Feb. 2027)', meta: 'Hanyang University ERICA | Mar. 2025 – Feb. 2027' },
  { title: 'B.S. in Computer and Information Communication Engineering', meta: 'Daejeon University | Mar. 2023 – Feb. 2025' },
];

const sourceResearch = [
  { title: 'Autonomous Driving and Flight Systems', bullets: ['Perception, localization, sensor fusion, and motion control for autonomous vehicles and unmanned aerial systems', 'Vision-based navigation, obstacle detection, path planning, and real-time decision-making in dynamic environments'] },
  { title: 'large language model', bullets: ['Application of LLMs in multimodal systems and domain-specific adaptation', 'Efficient fine-tuning, prompt engineering, and deployment in real-world applications'] },
  { title: 'Anomaly Detection', bullets: ['Vision-based anomaly detection in manufacturing, medical imaging, and autonomous systems', 'Integration with MLOps pipelines for real-time monitoring and automated response'] },
];

const sourceSkills = [
  ['Language', 'Python, C++'],
  ['Machine Learning / AI', 'PyTorch, OpenCV, YOLO'],
  ['MLOps & Tools', 'Git/GitHub, ONNX, MLflow, Google Cloud'],
  ['Robotics & Embedded', 'ROS2, rclcpp, rclpy, Sensor integration (IMU, camera, etc.)'],
  ['Web Development', 'Next.js, React, TypeScript, Vercel'],
  ['Other', 'Collaboration: Notion, Slack'],
];

const sourceWork = [
  {
    title: 'Molpaxbio — Internship (Jan 2025 – Feb 2025)',
    meta: 'Molpaxbio Co., Ltd. | Daejeon, Korea | AI-based digital pathology and cancer diagnostics startup',
    bullets: [
      'Participated in CES preparation, including training on AI diagnostic software and algorithms',
      'Assisted at the CES exhibition booth, engaging with industry experts and addressing inquiries',
      'Gained hands-on experience with medical imaging data preprocessing, including noise removal, filtering, and basic pattern analysis',
      'Learned and applied foundational techniques in medical imaging-based AI analysis using specialized software tools',
      'Developed skills in AI-based medical video classification and anomaly detection models, conducting experiments with labeled datasets',
      'Supported team projects by optimizing data processing workflows and evaluating model performance',
    ],
  },
  {
    title: 'HCNC — Internship (Jul 2025 – Aug 2025)',
    meta: 'HCNC Co., Ltd. | Pangyo, Korea | Smart factory and AI-integrated industrial solutions company',
    bullets: [
      'Learned core concepts of AI-based visual inspection and anomaly detection for manufacturing surface quality control',
      'Studied industrial AI applications and analyzed how real-world manufacturing data differs from research datasets due to noise, imbalance, and incomplete labeling',
      'Researched recent trends in anomaly detection, synthetic data generation, and data augmentation techniques for industrial defect inspection',
      'Participated in capstone project planning, including dataset collection strategy, model training direction, and MLOps-based system design',
      'Gained practical understanding of the full AI development workflow, from data preprocessing and quality management to model operation and system maintenance',
    ],
  },
  {
    title: 'HCNC — Internship (Jan 2026 – Feb 2026 )',
    meta: 'HCNC Co., Ltd. | Pangyo, Korea | Smart factory and AI-integrated industrial solutions company',
    bullets: [
      'Conducted research on AI vision-based anomaly detection models for industrial surface defect inspection, with a focus on steel and H-beam surface defects',
      'Collected and analyzed public industrial defect datasets, including Severstal, NEU, and MVTec, considering domain-specific factors such as lighting variation and surface reflection',
      'Designed an ensemble-based meta-model structure by combining fast classification models and precise localization models using normalized anomaly scores and feature representations',
      'Researched automated labeling workflows using SAM, CVAT, and AnyLabeling to reduce labeling bottlenecks in large-scale industrial datasets',
      'Studied MLOps pipeline components, including data and model versioning, retraining triggers, performance drift monitoring, and automated operation strategies',
    ],
  },
];

const sourceProjects = [
  { title: 'AI Vision-Based Anomaly Detection: Image Data Preprocessing and MLOps Application Development | 2025 ~ 2026', bullets: ['Automated image data preprocessing & labeling pipeline development', 'MLOps application for training, deployment, and visualization'] },
  { title: 'Autonomous Driving RC Car Development | ORDA, 2025', bullets: ['Implemented lane detection (1-lane / 2-lane mode) and object detection (YOLOv8-based vehicle detection & avoidance) modules in ROS2', 'Developed obstacle avoidance logic with offset calculation and lane-change completion verification', 'Converted YOLOv8n to ONNX for real-time inference on embedded devices'] },
  { title: 'LG Innotek AX Expert Training Program | AISI, 2026 | AI Transformation & Manufacturing AI Training Assistant', bullets: ['Supported hands-on AI/AX training sessions for manufacturing professionals', 'Assisted with Python, data analysis, machine learning practice, debugging, and lab environment setup', 'Guided trainees through practical exercises and helped resolve technical issues during sessions'] },
  { title: '제 1회 한양대학교 ERICA 자율주행 경진대회 주관 | ORDA, 2026.01', bullets: ['Organized and operated the 1st Hanyang University ERICA Autonomous Driving Competition', 'Coordinated participants, competition schedules, event logistics, and on-site communication', 'Managed registration, safety procedures, and overall event flow to ensure smooth competition operations'] },
  { title: '65th National Undergraduate Symposium in Biology | NusB, 2026 | Academic Committee Member', bullets: ['Served as a member of the Academic Committee, participating in neuroscience paper review, study, and presentation activities', 'Studied neural replay, memory, and predictive brain mechanisms through neuroscience research papers', 'Explored connections between biological learning and AI, including experience replay, internal models, and generative prediction', 'Developing a rule-based manuscript revision tool for Division 2 to support automated editorial review and consistency checks'] },
  { title: 'AI-Based Intersection Vehicle Counting & Monitoring System | Personal Project, 2026', bullets: ['Developed a YOLO-based video analysis system to detect, track, and count vehicles entering and exiting intersections', 'Improved counting accuracy under occlusion and nighttime conditions using BoT-SORT and ReID-based tracking', 'Built an integrated dashboard for analysis control, progress monitoring, and automated CSV result visualization'], href: 'https://intersection-vehicle-counter-dashbo.vercel.app/' },
];

const sourceAwards = [
  { title: '2024 자율주행 자동차 경진대회, 대상', detail: '소형 자율주행 로봇, | 대전대학교 2024.04' },
  { title: '폭스바겐우리재단 씨:미 해커톤, 최우수상', detail: '자율주행 스케일카, | 폭스바겐우리재단 2025.07' },
  { title: '제 8회 국민대학교 자율주행 경진대회, 3등', detail: '자율주행 스케일카, | 국민대학교 2025.08' },
  { title: '2026년 한양대학교 ERICA 소프트웨어융합대학 캡스톤디자인 경진대회 최우수상', detail: 'Image Data Preprocessing and MLOps Application, | 한양대학교 ERICA 2026.06' },
];

const sourceOtherAwards = [
  '2023년 청년 소셜 창업 해커톤 장려상',
  '2023 TP사업(지역협력기반 대학연합 IP 창업경진대회 최우수상',
  '2023 로컬크리에이터 양성사업 창업 아이디어 경진대회 최우수상',
  '2023 대전 지역사회 문제해결형 창업 아이디어 경진대회 우수상',
  '2023 초중고대연합 창업경진대회 우수상',
  '2023학년도 웰니스헬스케어 & 문화·디자인 특성화 분야 지역산업 분석 공모전 우수상',
  '2024 Start 창업경진대회 우수상',
  '2024 COSS 스타트업 경진대회 장려상',
  '2024 초중고대연합 창업경진대회 장려상',
  '2024년 청년 소셜 창업 해커톤 우수상',
  '2024 로컬크리에이터 아이디어 캠프 창업경진대회 우수상',
  '2024 ESG 창업 아이디어 펀딩스쿨 대상',
  '2025-2학기 Deep Tech Audition (한양대학교 ERICA) SEED상',
  '2025년 COSS-SCOUT 첨단기술 창업경진대회 우수상',
  '한양대 ERICA CTO-스타트업톤 장려상',
  '2026-1학기 Deep Tech Audition (한양대학교 ERICA) SEED상',
  '2026 경기실록지리지 경진대회 장려상',
];

const sourceOtherActivities = [
  '창의설계경진대회 후속지원 프로그램 | 2024.12.23. ~ 02.03',
  '말레이시아 자율주행 배달로봇 ‘HELLO ROBOTICS’ 마케팅 전략 수립 | 2025.01',
  '한양대 ERICA RC center 멘토, | 2025.09 ~ 2026.06',
  '제 1회 한양대학교 ERICA 자율주행 경진대회 주관 | 2025.10 ~ 2026.01',
  '2026년 청년창업유망팀 300 성장트랙 진행 중',
  '말레이시아 창업탐방, 2025.01.21 ~ 25',
  'COSS-SCOUT 첨단기술 창업경진대회',
  '한양대 ERICA RC 멘토 활동',
];

const verifiedEnglishTerms: Record<string, string> = {
  'B.S. in Artificial Intelligence (Expected Feb. 2027)': 'B.S. in Artificial Intelligence — Expected Feb. 2027',
  'B.S. in Computer and Information Communication Engineering': 'B.S. in Computer and Information Communication Engineering — Completed Feb. 2025',
  'Autonomous Driving and Flight Systems': 'Autonomous Ground and Aerial Systems',
  'large language model': 'Large Language Models',
  'Anomaly Detection': 'Vision-Based Anomaly Detection',
  'Language': 'Programming Languages',
  'Machine Learning / AI': 'AI & Machine Learning',
  'MLOps & Tools': 'MLOps & Development Tools',
  'Robotics & Embedded': 'Robotics & Embedded Systems',
  'Other': 'Collaboration Tools',
  'Molpaxbio — Internship (Jan 2025 – Feb 2025)': 'AI Intern | Molpaxbio | Jan–Feb 2025',
  'Molpaxbio Co., Ltd. | Daejeon, Korea | AI-based digital pathology and cancer diagnostics startup': 'Molpaxbio Co., Ltd. | Daejeon, South Korea | AI-Based Digital Pathology and Cancer Diagnostics Startup',
  'HCNC — Internship (Jul 2025 – Aug 2025)': 'AI Intern | HCNC | Jul–Aug 2025',
  'HCNC — Internship (Jan 2026 – Feb 2026 )': 'AI Intern | HCNC | Jan–Feb 2026',
  'HCNC Co., Ltd. | Pangyo, Korea | Smart factory and AI-integrated industrial solutions company': 'HCNC Co., Ltd. | Pangyo, South Korea | Smart Factory and AI-Integrated Industrial Solutions Company',
  'AI Vision-Based Anomaly Detection: Image Data Preprocessing and MLOps Application Development | 2025 ~ 2026': 'Vision-Based Anomaly Detection: Image Preprocessing and MLOps Application Development | 2025–2026',
  'Autonomous Driving RC Car Development | ORDA, 2025': 'Autonomous RC Car Development | ORDA | 2025',
  'LG Innotek AX Expert Training Program | AISI, 2026 | AI Transformation & Manufacturing AI Training Assistant': 'Teaching Assistant, LG Innotek AX Expert Training Program | AISI | 2026',
  '제 1회 한양대학교 ERICA 자율주행 경진대회 주관 | ORDA, 2026.01': 'Organizer, 1st Hanyang University ERICA Autonomous Driving Competition | ORDA | Jan 2026',
  '65th National Undergraduate Symposium in Biology | NusB, 2026 | Academic Committee Member': 'Academic Committee Member, 65th National Undergraduate Symposium in Biology | NusB | 2026',
  'AI-Based Intersection Vehicle Counting & Monitoring System | Personal Project, 2026': 'AI-Based Intersection Vehicle Counting and Monitoring System | Personal Project | 2026',
  '2024 자율주행 자동차 경진대회, 대상': 'Grand Prize, 2024 Daejeon University Autonomous Vehicle Competition',
  '소형 자율주행 로봇, | 대전대학교 2024.04': 'Small Autonomous Mobile Robot | Daejeon University | Apr 2024',
  '폭스바겐우리재단 씨:미 해커톤, 최우수상': 'Excellence Award, Volkswagen Group Woori Foundation SEA:ME Hackathon',
  '자율주행 스케일카, | 폭스바겐우리재단 2025.07': 'Autonomous Scale Car | Volkswagen Group Woori Foundation | Jul 2025',
  '제 8회 국민대학교 자율주행 경진대회, 3등': 'Third Place, 8th Kookmin University Autonomous Driving Competition',
  '자율주행 스케일카, | 국민대학교 2025.08': 'Autonomous Scale Car | Kookmin University | Aug 2025',
  '2026년 한양대학교 ERICA 소프트웨어융합대학 캡스톤디자인 경진대회 최우수상': 'Excellence Award, 2026 Hanyang University ERICA College of Computing Capstone Design Competition',
  'Image Data Preprocessing and MLOps Application, | 한양대학교 ERICA 2026.06': 'Image Data Preprocessing and MLOps Application | Hanyang University ERICA | Jun 2026',
  'Language Skills': 'Language Proficiency',
  'Extracurricular Work Experience': 'Additional Work Experience',
  '서울랜드 - 어트랙션, 2018.01 ~ 2018.05': 'Attraction Operator | Seoul Land | Jan–May 2018',
  'Snowy Village - Manager, 2018.06 ~ 2019.06': 'Store Manager | Snowy Village | Jun 2018–Jun 2019',
  'K - Pop Karaoke - Bartender, 2019.07 ~ 2020.03': 'Bartender | K-Pop Karaoke | Jul 2019–Mar 2020',
  '국군화생방방호사령부 제 24특임대대(화생방특수임무단), 2021.03 ~ 2022.12': '24th Special Mission Battalion, Republic of Korea CBRN Defense Command | Mar 2021–Dec 2022',
  'Extracurricular Awards': 'Additional Awards',
  '2023년 청년 소셜 창업 해커톤 장려상': 'Encouragement Award, 2023 Youth Social Entrepreneurship Hackathon',
  '2023 TP사업(지역협력기반 대학연합 IP 창업경진대회 최우수상': 'Excellence Award, 2023 TP Program Inter-University IP Startup Competition',
  '2023 로컬크리에이터 양성사업 창업 아이디어 경진대회 최우수상': 'Excellence Award, 2023 Local Creator Development Program Startup Idea Competition',
  '2023 대전 지역사회 문제해결형 창업 아이디어 경진대회 우수상': 'Outstanding Award, 2023 Daejeon Community Problem-Solving Startup Idea Competition',
  '2023 초중고대연합 창업경진대회 우수상': 'Outstanding Award, 2023 Inter-School Startup Competition',
  '2023학년도 웰니스헬스케어 & 문화·디자인 특성화 분야 지역산업 분석 공모전 우수상': 'Outstanding Award, 2023 Regional Industry Analysis Competition — Wellness Healthcare, Culture & Design',
  '2024 Start 창업경진대회 우수상': 'Outstanding Award, 2024 START Startup Competition',
  '2024 COSS 스타트업 경진대회 장려상': 'Encouragement Award, 2024 COSS Startup Competition',
  '2024 초중고대연합 창업경진대회 장려상': 'Encouragement Award, 2024 Inter-School Startup Competition',
  '2024년 청년 소셜 창업 해커톤 우수상': 'Outstanding Award, 2024 Youth Social Entrepreneurship Hackathon',
  '2024 로컬크리에이터 아이디어 캠프 창업경진대회 우수상': 'Outstanding Award, 2024 Local Creator Idea Camp Startup Competition',
  '2024 ESG 창업 아이디어 펀딩스쿨 대상': 'Grand Prize, 2024 ESG Startup Idea Funding School',
  '2025-2학기 Deep Tech Audition (한양대학교 ERICA) SEED상': 'SEED Award, Fall 2025 Deep Tech Audition — Hanyang University ERICA',
  '2025년 COSS-SCOUT 첨단기술 창업경진대회 우수상': 'Outstanding Award, 2025 COSS-SCOUT Advanced Technology Startup Competition',
  '한양대 ERICA CTO-스타트업톤 장려상': 'Encouragement Award, Hanyang University ERICA CTO Start-up-thon',
  '2026-1학기 Deep Tech Audition (한양대학교 ERICA) SEED상': 'SEED Award, Spring 2026 Deep Tech Audition — Hanyang University ERICA',
  '2026 경기실록지리지 경진대회 장려상': 'Encouragement Award, 2026 Gyeonggi Sillok Jiriji University Startup Alliance Camp',
  'Extracurricular Activities': 'Additional Activities',
  '창의설계경진대회 후속지원 프로그램 | 2024.12.23. ~ 02.03': 'Creative Design Competition Follow-Up Support Program | Dec 23, 2024–Feb 3, 2025',
  '말레이시아 자율주행 배달로봇 ‘HELLO ROBOTICS’ 마케팅 전략 수립 | 2025.01': 'Marketing Strategy Development for HELLO ROBOTICS, a Malaysian Autonomous Delivery Robot Company | Jan 2025',
  '한양대 ERICA RC center 멘토, | 2025.09 ~ 2026.06': 'Residential College Center Mentor | Hanyang University ERICA | Sep 2025–Jun 2026',
  '제 1회 한양대학교 ERICA 자율주행 경진대회 주관 | 2025.10 ~ 2026.01': 'Organizer, 1st Hanyang University ERICA Autonomous Driving Competition | Oct 2025–Jan 2026',
  '2026년 청년창업유망팀 300 성장트랙 진행 중': '2026 Promising Student Startup Team 300 — Growth Track | Ongoing',
  '말레이시아 창업탐방, 2025.01.21 ~ 25': 'Malaysia Startup Exploration Program | Jan 21–25, 2025',
  'COSS-SCOUT 첨단기술 창업경진대회': 'COSS-SCOUT Advanced Technology Startup Competition',
  '한양대 ERICA RC 멘토 활동': 'Residential College Mentoring | Hanyang University ERICA',
};

const playTopics: Array<{ key: string; label: Localized; code: string; title: Localized; body: Localized }> = [
  { key: 'vision', code: '01', label: { en: 'VISION', ko: '비전' }, title: { en: 'Seeing industrial and road scenes', ko: '산업 현장과 도로 장면을 보는 기술' }, body: { en: 'Surface-defect inspection, medical image preprocessing, and vehicle detection are the recurring vision problems in my work.', ko: '표면 결함 검사, 의료 영상 전처리, 차량 탐지는 제가 반복해서 다뤄온 비전 문제입니다.' } },
  { key: 'robotics', code: '02', label: { en: 'ROBOTICS', ko: '로보틱스' }, title: { en: 'Perception connected to motion', ko: '인지에서 움직임까지' }, body: { en: 'With ROS2, YOLOv8, and ONNX, I built lane perception, vehicle avoidance, and lane-change verification for an RC car.', ko: 'ROS2, YOLOv8, ONNX로 RC카의 차선 인식, 차량 회피, 차선 변경 완료 검증을 구현했습니다.' } },
  { key: 'mlops', code: '03', label: { en: 'MLOPS', ko: 'MLOPS' }, title: { en: 'From data preparation to operation', ko: '데이터 준비부터 운영까지' }, body: { en: 'My anomaly-detection project connects preprocessing, labeling, training, deployment, visualization, and monitoring strategies.', ko: '이상 탐지 프로젝트에서 전처리, 라벨링, 학습, 배포, 시각화와 모니터링 전략을 연결했습니다.' } },
  { key: 'people', code: '04', label: { en: 'PEOPLE', ko: '사람' }, title: { en: 'Learning by helping others learn', ko: '다른 사람의 배움을 도우며 배우기' }, body: { en: 'I have mentored RC teams, organized a competition, supported manufacturing AI training, and reviewed neuroscience papers with a student committee.', ko: 'RC 팀 멘토링, 대회 운영, 제조업 AI 교육 지원, 학생 학술위원회 논문 검토를 경험했습니다.' } },
];

const playTopicDetails: Localized[] = [
  { en: 'Visual inspection · medical imaging · YOLO-based vehicle detection', ko: '비전 검사 · 의료 영상 · YOLO 기반 차량 탐지' },
  { en: 'ROS2 · YOLOv8 · ONNX · lane-change verification', ko: 'ROS2 · YOLOv8 · ONNX · 차선 변경 검증' },
  { en: 'Preprocessing · labeling · training · deployment · monitoring', ko: '전처리 · 라벨링 · 학습 · 배포 · 모니터링' },
  { en: 'Mentoring · event operations · teaching assistance · paper review', ko: '멘토링 · 대회 운영 · 교육 지원 · 논문 검토' },
];

const playProjectDetails: Localized[][] = [
  [
    { en: 'Automated image preprocessing and labeling', ko: '이미지 전처리와 라벨링 자동화' },
    { en: 'Training, deployment, and visualization in one MLOps application', ko: '학습·배포·시각화를 하나의 MLOps 애플리케이션으로 연결' },
  ],
  [
    { en: 'Lane perception and YOLOv8 vehicle avoidance in ROS2', ko: 'ROS2 기반 차선 인식과 YOLOv8 차량 회피' },
    { en: 'Lane-change completion verification and ONNX inference', ko: '차선 변경 완료 검증과 ONNX 추론' },
  ],
  [
    { en: 'YOLO detection with BoT-SORT and ReID tracking', ko: 'YOLO 탐지와 BoT-SORT·ReID 추적' },
    { en: 'Directional counting and automated CSV visualization', ko: '방향별 계수와 CSV 자동 시각화' },
  ],
];

function LocaleSwitcher({ locale, setLocale, inverse = false }: { locale: Locale; setLocale: (locale: Locale) => void; inverse?: boolean }) {
  const t = ui[locale];
  return <div className={`locale-switcher${inverse ? ' inverse' : ''}`} aria-label="Language">
    <button className={locale === 'en' ? 'active' : ''} type="button" aria-label={t.switchEnglish} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}><span aria-hidden="true"><img src="https://flagcdn.com/w40/us.png" alt="" /></span><small>{t.eng}</small></button>
    <button className={locale === 'ko' ? 'active' : ''} type="button" aria-label={t.switchKorean} aria-pressed={locale === 'ko'} onClick={() => setLocale('ko')}><span aria-hidden="true"><img src="https://flagcdn.com/w40/kr.png" alt="" /></span><small>{t.kor}</small></button>
  </div>;
}

function CategoryBar({ locale, setLocale, reset, inverse = false }: { locale: Locale; setLocale: (locale: Locale) => void; reset: () => void; inverse?: boolean }) {
  return <header className={`category-bar${inverse ? ' inverse' : ''}`}>
    <button className="home-button" type="button" onClick={reset}>HOME</button>
    <strong>SeoKyoung Kim.</strong>
    <LocaleSwitcher locale={locale} setLocale={setLocale} inverse={inverse} />
  </header>;
}

function ModeGate({ locale, setLocale, choose }: { locale: Locale; setLocale: (locale: Locale) => void; choose: (mode: Exclude<Mode, null>, origin?: { x: number; y: number }) => void }) {
  const t = ui[locale];
  return <main className="mode-gate">
    <div className="mode-gate-top"><LocaleSwitcher locale={locale} setLocale={setLocale} /></div>
    <div className="mode-gate-copy"><p>{t.choose}</p><h1>{t.gateTitle}</h1></div>
    <div className="mode-options">
      <button className="mode-option mode-option-info" onClick={() => choose('info')}>
        <span>{t.readCode}</span><span className="option-preview">Aa</span><strong>{t.readTitle}</strong><p>{t.readBody}</p><b>{t.enter}</b>
      </button>
      <button className="mode-option mode-option-play" onClick={event => {
        const rect = event.currentTarget.querySelector('.option-orbit')?.getBoundingClientRect();
        choose('play', rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
      }}>
        <span>{t.playCode}</span><span className="option-orbit"><i /><i /><i /></span><strong>{t.playTitle}</strong><p>{t.playBody}</p><b>{t.enter}</b>
      </button>
    </div>
  </main>;
}

function CvSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section className="cv-section" id={id}><header><span>{number}</span><h2>{title}</h2></header>{children}</section>;
}

function SourceDetail({ title, meta, bullets, href }: { title: string; meta?: string; bullets?: string[]; href?: string }) {
  return <article className="source-detail">
    <h3>{title}</h3>
    {meta && <p className="source-meta">{meta}</p>}
    {bullets && <ul>{bullets.map(item => <li key={item}>{item}</li>)}</ul>}
    {href && <a href={href} target="_blank" rel="noreferrer">{href}</a>}
  </article>;
}

function InfoMode({ locale, setLocale, reset }: { locale: Locale; setLocale: (locale: Locale) => void; reset: () => void }) {
  const t = ui[locale];
  const text = (value: string) => locale === 'en' ? (verifiedEnglishTerms[value] ?? value) : value;
  const sections = locale === 'en'
    ? [['education', 'Education'], ['research', 'Research Interests'], ['skills', 'Skills'], ['work', 'Professional Experience'], ['projects', 'Projects & Activities'], ['awards', 'Awards'], ['other', 'Additional Information']]
    : [['education', '학력'], ['research', '연구 관심 분야'], ['skills', '기술'], ['work', '경력'], ['projects', '프로젝트 및 활동'], ['awards', '수상'], ['other', '기타 정보']];
  return <main className="info-mode"><CategoryBar locale={locale} setLocale={setLocale} reset={reset} />
    <div className="cv-layout"><aside className="cv-sidebar">
      <div><a className="brand light-brand" href="#cv-top">SeoKyoung Kim</a><p>INDEX</p></div>
      <nav>{sections.map(([href, label]) => <a href={`#${href}`} key={href}>{label}</a>)}</nav>
      <div className="cv-side-bottom"><span>© 2026 SEOKYOUNG KIM.</span></div>
    </aside>
    <article className="cv-document" id="cv-top">
      <header className="cv-hero source-hero"><p>{t.profile} / 2026</p><h1>{locale === 'en' ? <>SeoKyoung<br />Kim</> : <>김서경<br />SeoKyoung Kim</>}</h1><div><strong>Email: sk0829@hanyang.ac.kr</strong><span>GitHub: https://github.com/tjrud</span></div></header>

      <CvSection id="education" number="01" title={sections[0][1]}>
        <div className="source-list">{sourceEducation.map(item => <SourceDetail key={item.title} title={text(item.title)} meta={text(item.meta)} />)}</div>
      </CvSection>

      <CvSection id="research" number="02" title={sections[1][1]}>
        <div className="source-list">{sourceResearch.map(item => <SourceDetail key={item.title} title={text(item.title)} bullets={item.bullets.map(text)} />)}</div>
      </CvSection>

      <CvSection id="skills" number="03" title={sections[2][1]}>
        <div className="skill-table">{sourceSkills.map(([group, list]) => <div key={group}><strong>[ {text(group)} ]</strong><span>{text(list)}</span></div>)}</div>
      </CvSection>

      <CvSection id="work" number="04" title={sections[3][1]}>
        <div className="source-list">{sourceWork.map(item => <SourceDetail key={item.title} title={text(item.title)} meta={text(item.meta)} bullets={item.bullets.map(text)} />)}</div>
      </CvSection>

      <CvSection id="projects" number="05" title={sections[4][1]}>
        <div className="source-list">{sourceProjects.map(item => <SourceDetail key={item.title} title={text(item.title)} bullets={item.bullets.map(text)} href={item.href} />)}</div>
      </CvSection>

      <CvSection id="awards" number="06" title={sections[5][1]}>
        <div className="source-list award-source-list">{sourceAwards.map(item => <SourceDetail key={item.title} title={text(item.title)} bullets={[text(item.detail)]} />)}</div>
      </CvSection>

      <CvSection id="other" number="07" title={sections[6][1]}>
        <div className="source-list other-source-list">
          <SourceDetail title={text('Language Skills')} bullets={['TOEIC 935 | YBM | Dec 2024']} />
          <SourceDetail title={text('Extracurricular Work Experience')} bullets={['서울랜드 - 어트랙션, 2018.01 ~ 2018.05', 'Snowy Village - Manager, 2018.06 ~ 2019.06', 'K - Pop Karaoke - Bartender, 2019.07 ~ 2020.03', '국군화생방방호사령부 제 24특임대대(화생방특수임무단), 2021.03 ~ 2022.12'].map(text)} />
          <SourceDetail title={text('Extracurricular Awards')} bullets={sourceOtherAwards.map(text)} />
          <SourceDetail title={text('Extracurricular Activities')} bullets={sourceOtherActivities.map(text)} />
        </div>
      </CvSection>

      <footer className="cv-contact"><p>{t.contact}</p><h2>sk0829@hanyang.ac.kr</h2><div><a href="mailto:sk0829@hanyang.ac.kr">EMAIL ↗</a><a href="https://github.com/tjrud" target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>
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
  const [visitedTopics, setVisitedTopics] = useState<number[]>([0]);
  const [unlockValue, setUnlockValue] = useState(0);
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(0);
  const [unlocked, setUnlocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [boxOffset, setBoxOffset] = useState(0);
  const boxGesture = useRef({ active: false, startY: 0, startValue: 0, side: 1 });
  const micro = locale === 'en' ? {
    lockKicker: 'INTERACTIVE / 02', lockTitle: <>How much would you<br />like to <em>see?</em></>,
    drag: 'LOWER EITHER SIDE, THEN RELEASE',
    levels: ['BRIEF', 'STANDARD', 'DETAILED'], depth: 'DETAIL',
    discovered: 'VIEWED', random: 'NEXT TOPIC', cursor: 'MOVE TO INTERACT',
  } : {
    lockKicker: '인터랙티브 / 02', lockTitle: <>얼마나 자세히<br /><em>볼까요?</em></>,
    drag: '왼쪽이나 오른쪽을 잡고 내려보세요',
    levels: ['간단히', '기본', '자세히'], depth: '상세도',
    discovered: '확인한 주제', random: '다음 주제', cursor: '움직여 보세요',
  };

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(distance > 0 ? Math.min(100, (window.scrollY / distance) * 100) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [unlocked]);

  const selectTopic = (index: number) => {
    setActiveTopic(index);
    setVisitedTopics(current => current.includes(index) ? current : [...current, index]);
  };
  const randomTopic = () => {
    const next = (activeTopic + 1 + Math.floor(Math.random() * (playTopics.length - 1))) % playTopics.length;
    selectTopic(next);
  };
  const setDepth = (value: number) => {
    const next = Math.max(0, Math.min(100, value));
    setUnlockValue(next);
    setDetailLevel(next < 34 ? 0 : next < 67 ? 1 : 2);
  };
  const unlock = () => window.setTimeout(() => setUnlocked(true), 180);
  const beginTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    boxGesture.current = { active: true, startY: event.clientY, startValue: unlockValue, side: event.clientX < rect.left + rect.width / 2 ? -1 : 1 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!boxGesture.current.active) return;
    const delta = event.clientY - boxGesture.current.startY;
    const directedDelta = delta * boxGesture.current.side;
    setBoxOffset(Math.max(-42, Math.min(42, directedDelta)));
    setDepth(boxGesture.current.startValue + directedDelta / 1.45);
  };
  const endTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!boxGesture.current.active) return;
    boxGesture.current.active = false;
    setBoxOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    unlock();
  };
  const tiltWithKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Enter') return;
    event.preventDefault();
    if (event.key === 'Enter') return unlock();
    setDepth(unlockValue + (event.key === 'ArrowRight' ? 10 : -10));
  };
  const pointer = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };
  const topic = playTopics[activeTopic];

  if (!unlocked) return <main className="play-mode unlock-mode" onPointerMove={pointer}>
    <CategoryBar locale={locale} setLocale={setLocale} reset={reset} inverse />
    <section className="unlock-stage">
      <div className="unlock-copy"><p>{micro.lockKicker}</p><h1>{micro.lockTitle}</h1></div>
      <div className="box-control">
        <div className="motion-box" role="slider" tabIndex={0} aria-label={micro.drag} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(unlockValue)}
          style={{ '--ball-left': `calc(${unlockValue}% - ${unlockValue * .6}px + 8px)`, '--track-tilt': `${Math.max(-4, Math.min(4, boxOffset * .1))}deg` } as CSSProperties}
          onPointerDown={beginTilt} onPointerMove={moveTilt} onPointerUp={endTilt} onPointerCancel={endTilt} onKeyDown={tiltWithKeyboard}>
          <div className="ball-track" aria-hidden="true"><i /></div>
          <div className="box-reading"><strong>{micro.levels[detailLevel]}</strong><span>{Math.round(unlockValue)}%</span></div>
        </div>
        <p>{micro.drag}</p>
        <div className="unlock-scale" aria-hidden="true">{micro.levels.map((label, index) => <span className={detailLevel === index ? 'active' : ''} key={label}>{label}</span>)}</div>
      </div>
    </section>
  </main>;

  if (detailLevel === 0) return <main className="play-mode brief-view">
    <CategoryBar locale={locale} setLocale={setLocale} reset={reset} inverse />
    <section className="brief-shell">
      <header><p>{t.playKicker}</p><h1>{locale === 'en' ? 'SeoKyoung Kim.' : '김서경.'}</h1><span>{t.playIntro}</span></header>
      <nav className="brief-depth" aria-label={micro.depth}><span>{micro.depth}</span>{micro.levels.map((level, index) => <button type="button" className={detailLevel === index ? 'active' : ''} key={level} onClick={() => setDetailLevel(index as DetailLevel)}>{level}</button>)}</nav>
      <div className="brief-list"><p>{locale === 'en' ? 'AREAS' : '관심 분야'}</p>{playTopics.map((item, index) => <button type="button" key={item.key} onClick={() => selectTopic(index)}><span>{item.code}</span><strong>{localize(item.label)}</strong><b>↗</b></button>)}</div>
      <div className="brief-projects"><p>{t.selectedProjects}</p>{projects.map(project => <article key={project.number}><span>{project.number}</span><h2>{localize(project.title)}</h2><time>{project.date}</time></article>)}</div>
    </section>
    <footer className="brief-footer"><span>{t.footer}</span><a href="mailto:sk0829@hanyang.ac.kr">sk0829@hanyang.ac.kr ↗</a></footer>
  </main>;

  return <main className={`play-mode unlocked-view detail-${detailLevel}`} onPointerMove={pointer}>
    <div className="scroll-progress" aria-hidden="true"><i style={{ width: `${scrollProgress}%` }} /></div>
    <CategoryBar locale={locale} setLocale={setLocale} reset={reset} inverse />
    <section className="play-hero" id="play-top"><div className="play-heading"><p>{t.playKicker}</p><h1>{t.playTitleMain}</h1><span>{t.playIntro}</span></div>
      <div className="constellation">
        <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
        {playTopics.map((item, index) => <button className={`orbit-node node-${index + 1}${activeTopic === index ? ' active' : ''}${visitedTopics.includes(index) ? ' visited' : ''}`} key={item.key} onClick={() => selectTopic(index)} aria-pressed={activeTopic === index}><i>{item.code}</i>{localize(item.label)}</button>)}
        <div className="signal-card" aria-live="polite"><p>{t.selectedSignal} / {topic.code}</p><h2>{localize(topic.title)}</h2>{detailLevel >= 1 && <span>{localize(topic.body)}</span>}{detailLevel === 2 && <small>{localize(playTopicDetails[activeTopic])}</small>}</div>
      </div>
      <div className="play-console"><span><i />{micro.cursor}</span><label><b>{micro.depth}</b><input type="range" min="0" max="2" step="1" value={detailLevel} onInput={event => setDetailLevel(Number(event.currentTarget.value) as DetailLevel)} /><em>{micro.levels[detailLevel]}</em></label><strong>{micro.discovered} {String(visitedTopics.length).padStart(2, '0')} / 04</strong><button type="button" onClick={randomTopic}>{micro.random} ↗</button></div>
    </section>

    <section className="play-projects"><header><p>{t.selectedProjects}</p><span>{t.tiltHint}</span></header><div className="play-project-grid">
      {projects.map((project, index) => <TiltCard className={`play-project project-${index + 1}`} key={project.number}><div><span>{project.number}</span><span>{project.date}</span></div><h2>{localize(project.title)}</h2>{detailLevel >= 1 && <p>{localize(project.detail)}</p>}{detailLevel === 2 && <ul>{playProjectDetails[index].map(item => <li key={item.en}>{localize(item)}</li>)}</ul>}<footer><div>{project.tags.map(tag => <i key={tag}>{tag}</i>)}</div>{project.href && <a href={project.href} target="_blank" rel="noreferrer">↗</a>}</footer></TiltCard>)}
    </div></section>

    {detailLevel >= 1 && <section className="play-facts"><p>{t.playFacts}</p><div>{t.facts.map((fact, i) => <TiltCard key={fact}><span>0{i + 1}</span><h3>{fact}</h3></TiltCard>)}</div></section>}

    <footer className="play-footer"><h2>sk0829<br />@hanyang.ac.kr</h2><div><span>{t.footer}</span><a href="mailto:sk0829@hanyang.ac.kr">EMAIL ↗</a><a href="#play-top">TOP ↑</a></div></footer>
  </main>;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>(null);
  const [locale, setLocale] = useState<Locale>('en');
  const [transitionTarget, setTransitionTarget] = useState<Mode>(null);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const chooseMode = (next: Exclude<Mode, null>, origin?: { x: number; y: number }) => {
    if (origin) setTransitionOrigin(origin);
    setTransitionTarget(next);
    window.setTimeout(() => setMode(next), next === 'play' ? 620 : 360);
    window.setTimeout(() => setTransitionTarget(null), next === 'play' ? 980 : 620);
  };
  const reset = () => setMode(null);
  const content = mode === 'info'
    ? <InfoMode locale={locale} setLocale={setLocale} reset={reset} />
    : mode === 'play'
      ? <PlayMode locale={locale} setLocale={setLocale} reset={reset} />
      : <ModeGate locale={locale} setLocale={setLocale} choose={chooseMode} />;
  const transitionStyle = { '--transition-x': `${transitionOrigin.x}px`, '--transition-y': `${transitionOrigin.y}px` } as CSSProperties;
  return <>{content}{transitionTarget && <div className={`mode-transition transition-${transitionTarget}`} style={transitionStyle} aria-hidden="true"><div><i /><i /><i /></div><p>{transitionTarget === 'play' ? (locale === 'en' ? 'ENTERING INTERACTIVE' : '인터랙티브 모드로 이동') : (locale === 'en' ? 'OPENING INFORMATION' : '정보 페이지 열기')}</p></div>}</>;
}
