import Layout from '../components/Layout';
import SocialLinks from '../components/SocialLinks';
import AnimatedName from '../components/AnimatedName';

export default function Home() {
  return (
    <Layout showNavLinks={false}>
      <section className="hero">
        <h1 className="hero-title">
          Hey, I'm <AnimatedName />
        </h1>
        <div className="hero-main">
          <div className="hero-content">

            <p className="hero-subtitle">
              A sofrware engineer building systems that scale in Amsterdam
            </p>

            <div className="hero-description">
              <p>
                I architect and scale backend systems that handle millions of requests.
                From payment processing to logistics orchestration, I turn complex
                technical challenges into reliable production infrastructure.
              </p>

              <p>
                6 years shipping products across <strong>finance</strong>, <strong>ecommerce</strong>, and <strong>logistics</strong>.
                I work with Python (Django, FastAPI), JavaScript (React, Node.js), PostgreSQL,
                Docker, Redis, and Kubernetes to build systems that just work.
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
        </div>
      </section>
    </Layout>
  );
}
