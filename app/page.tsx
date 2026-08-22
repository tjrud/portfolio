const projects = [
  {
    number: '01',
    title: 'Industrial Anomaly Detection',
    description: 'An end-to-end visual inspection workflow: image preprocessing, SAM-assisted labeling, ensemble anomaly scoring, training, deployment, and monitoring.',
    tags: ['Computer Vision', 'MLOps', '2025—26'],
    className: 'dark',
  },
  {
    number: '02',
    title: 'Autonomous Driving RC Car',
    description: 'ROS2 lane perception, YOLOv8 object avoidance, lane-change verification, and ONNX inference built for embedded real-time control.',
    tags: ['ROS2', 'YOLOv8', 'Edge AI'],
    className: 'lime',
  },
  {
    number: '03',
    title: 'Intersection Vehicle Counter',
    description: 'A YOLO + BoT-SORT video analysis system for vehicle detection, tracking, and directional counting—even under occlusion and low light.',
    tags: ['Tracking', 'ReID', 'Dashboard'],
    className: 'coral',
    href: 'https://intersection-vehicle-counter-dashbo.vercel.app/',
  },
];

const experience = [
  {
    date: 'JAN—FEB 2026', company: 'HCNC', role: 'AI Research Intern',
    detail: 'Researched industrial surface-defect detection for steel and H-beams, ensemble meta-models, automated labeling, and MLOps retraining strategies.',
  },
  {
    date: 'JUL—AUG 2025', company: 'HCNC', role: 'AI Intern',
    detail: 'Studied real-world manufacturing data, anomaly detection, synthetic data generation, and production AI system design.',
  },
  {
    date: 'JAN—FEB 2025', company: 'Molpaxbio', role: 'AI Intern',
    detail: 'Worked with digital pathology workflows, medical image preprocessing, video classification, and AI diagnostics during CES preparation.',
  },
];

const awards = [
  ['2026', 'Hanyang ERICA Capstone Design', 'Grand Prize'],
  ['2025', 'Volkswagen Group Korea SEA:ME Hackathon', 'Excellence Award'],
  ['2025', 'Kookmin Univ. Autonomous Driving Competition', '3rd Place'],
  ['2024', 'Autonomous Vehicle Competition, Daejeon Univ.', 'Grand Prize'],
];

const skills = ['Python', 'C++', 'PyTorch', 'OpenCV', 'YOLO', 'ROS2', 'ONNX', 'MLflow', 'Next.js', 'TypeScript', 'Google Cloud'];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Go to top">SK<span>°</span></a>
        <div className="nav-links">
          <a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a>
          <a href="mailto:sk0829@hanyang.ac.kr" className="nav-cta">Let’s talk ↗</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="pulse" /> AI Engineer · Seoul, KR</div>
        <h1>I build intelligence<br />for the <em>physical world.</em></h1>
        <div className="hero-bottom">
          <p>Autonomous systems, computer vision, and production AI—designed to perceive, decide, and move in the real world.</p>
          <a href="#work" className="round-link" aria-label="View selected work">↓</a>
        </div>
        <div className="radar" aria-hidden="true"><i /><i /><i /><span /></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head"><p>Selected work</p><p>2025—2026</p></div>
        <div className="project-grid">
          {projects.map((project) => {
            const Card = project.href ? 'a' : 'article';
            return (
              <Card className={`project-card ${project.className}`} key={project.number} {...(project.href ? { href: project.href, target: '_blank', rel: 'noreferrer' } : {})}>
                <div className="project-top"><span>{project.number}</span><span>{project.href ? 'Visit ↗' : 'Case study'}</span></div>
                <div><h2>{project.title}</h2><p>{project.description}</p></div>
                <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="shell">
          <div className="section-head light"><p>Field experience</p><p>From research to production</p></div>
          <div className="timeline">
            {experience.map((item, i) => (
              <article className="timeline-row" key={item.date + item.company}>
                <span className="timeline-index">0{i + 1}</span>
                <p className="timeline-date">{item.date}</p>
                <div><h3>{item.company}</h3><p className="role">{item.role}</p></div>
                <p className="timeline-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="section-head"><p>Profile</p><p>Curious by design</p></div>
        <div className="about-grid">
          <div className="about-copy">
            <span className="big-mark">*</span>
            <h2>Engineering AI that holds up outside the lab.</h2>
            <p>I’m SeoKyoung Kim, an AI student and engineer focused on autonomy, perception, and deployable ML systems. I like the point where research meets noisy sensors, limited compute, and real users.</p>
            <div className="contact-links"><a href="mailto:sk0829@hanyang.ac.kr">Email ↗</a><a href="https://github.com/tjrud" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </div>
          <div className="study-stack">
            <article><p>2025—2027</p><h3>B.S. Artificial Intelligence</h3><span>Hanyang University ERICA</span></article>
            <article><p>2023—2025</p><h3>Computer & Information Communication Engineering</h3><span>Daejeon University</span></article>
            <article className="interest-card"><p>Research focus</p><h3>Autonomous systems · Multimodal LLMs · Anomaly detection</h3></article>
          </div>
        </div>
      </section>

      <section className="skill-band" aria-label="Technical skills">
        <div className="skill-track">{[...skills, ...skills].map((skill, i) => <span key={`${skill}-${i}`}>{skill} <b>✳</b></span>)}</div>
      </section>

      <section className="recognition shell">
        <div className="section-head"><p>Recognition</p><p>Selected awards</p></div>
        <div className="award-list">
          {awards.map(([year, event, prize]) => <article key={event}><span>{year}</span><h3>{event}</h3><p>{prize}</p></article>)}
        </div>
        <p className="award-note">Plus 15+ awards across deep-tech, ESG, startup, and community problem-solving competitions.</p>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div><p>Have an ambitious AI problem?</p><h2>Let’s build<br /><em>what’s next.</em></h2></div>
          <a className="footer-mail" href="mailto:sk0829@hanyang.ac.kr">sk0829@hanyang.ac.kr ↗</a>
          <div className="footer-bottom"><span>© 2026 SeoKyoung Kim</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
