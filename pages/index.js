import Layout from '../components/Layout';
import SocialLinks from '../components/SocialLinks';

export default function Home() {
  return (
    <Layout showNavLinks={false}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hey, I'm <span className="highlight">Jesse Egbosionu</span>
          </h1>

          <p className="hero-subtitle">
            Software Engineer crafting scalable backend systems in Amsterdam
          </p>

          <div className="hero-description">
            <p>
              I build and scale software backends with a focus on creating impact through
              teamwork and continuous learning. My passion lies in solving complex problems
              and delivering solutions that enrich people's lives.
            </p>

            <p>
              Over the past 6 years, I've shipped products across <strong>finance</strong>, <strong>ecommerce</strong>,
              and <strong>logistics</strong>, working with technologies like Python (Django, FastAPI),
              JavaScript (React, Node.js), PostgreSQL, Docker, Redis, and Kubernetes.
            </p>
          </div>

          <SocialLinks />

          <a href="mailto:me@jesseinit.dev" className="primary-cta">
            <span>Let's work together</span>
            <span className="arrow">→</span>
          </a>
        </div>

        <div className="hero-image-wrapper">
          <div className="image-backdrop"></div>
          <img
            src="hero.jpg"
            alt="Jesse Egbosionu"
            className="hero-image"
          />
        </div>
      </section>
    </Layout>
  );
}
