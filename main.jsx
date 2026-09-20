import React, { useEffect, useRef, useState } from "react";
import "./App.css";

/*
  ALBIN — FREELANCER PORTFOLIO
  --------------------------------
  Focus:
  • Content Writing
  • SEO Blog Writing
  • SEO Optimized Captions
  • Money & Motivation Creators

  NOTE:
  Replace placeholder images, statistics, email and social URLs
  with Albin's real information before publishing.
*/


/* =========================================
   SCROLL REVEAL
========================================= */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}


/* =========================================
   NUMBER COUNTER
========================================= */

function Counter({ target, suffix = "+" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1400;

        const animate = (time) => {
          const progress = Math.min(
            (time - start) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);

          setValue(Math.floor(target * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}


/* =========================================
   MAGNETIC BUTTON
========================================= */

function MagneticButton({ children, href = "#contact" }) {
  const buttonRef = useRef(null);

  const move = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const leave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform =
        "translate(0,0)";
    }
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className="magnetic-button"
      onMouseMove={move}
      onMouseLeave={leave}
    >
      <span>{children}</span>
    </a>
  );
}


/* =========================================
   PARALLAX HERO
========================================= */

function HeroVisual() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const y = window.scrollY;

      ref.current.style.transform =
        `translateY(${y * -0.035}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div ref={ref} className="hero-visual">

      <div className="floating-card floating-one">
        <span>Specialization</span>
        <strong>SEO Content</strong>
      </div>

      <div className="profile-frame">

        <div className="image-reveal">

          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85"
            alt="Creative workspace"
          />

          <div className="image-gradient" />

          <div className="profile-caption">
            <strong>ALBIN</strong>
            <span>
              Content Writer · SEO Copywriter
            </span>
          </div>

        </div>

      </div>

      <div className="floating-card floating-two">
        <span>Writing Focus</span>
        <strong>Money × Motivation</strong>
      </div>

      <div className="orb orb-one" />
      <div className="orb orb-two" />

    </div>
  );
}


/* =========================================
   PROGRESS BAR
========================================= */

function Skill({ name, percentage }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const bar =
            entry.target.querySelector(".skill-fill");

          bar.style.width = `${percentage}%`;

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={ref} className="skill">
      <div className="skill-heading">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>

      <div className="skill-track">
        <div className="skill-fill" />
      </div>
    </div>
  );
}


/* =========================================
   SERVICE CARD
========================================= */

function ServiceCard({
  number,
  icon,
  title,
  description
}) {
  return (
    <Reveal className="service-card-wrap">

      <article className="glass-card service-card">

        <div className="service-top">
          <div className="service-icon">
            {icon}
          </div>

          <span className="service-number">
            {number}
          </span>
        </div>

        <div className="service-content">
          <h3>{title}</h3>

          <p>{description}</p>
        </div>

        <div className="card-glow" />

      </article>

    </Reveal>
  );
}


/* =========================================
   APP
========================================= */

export default function App() {

  return (
    <div className="app">

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="navbar">

        <a href="#" className="brand">
          ALBIN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          href="#contact"
          className="nav-button"
        >
          Let's Work
        </a>

      </nav>


      {/* =========================
          HERO
      ========================= */}

      <header className="hero">

        <div className="hero-grid">

          <Reveal className="hero-copy">

            <div className="availability">
              <span />
              Available for new projects
            </div>

            <div className="hero-kicker">
              CONTENT · SEO · COPYWRITING
            </div>

            <h1>
              Words that
              <br />
              <span className="gradient-text">
                get attention.
              </span>
            </h1>

            <p className="hero-description">
              I'm <strong>Albin</strong> — a content writer
              helping small creators in the
              <strong> money & motivation niche</strong>
              turn ideas into useful blogs, engaging
              content and search-friendly captions.
            </p>

            <div className="hero-actions">

              <MagneticButton href="#work">
                Explore My Work →
              </MagneticButton>

              <a
                href="#contact"
                className="outline-button"
              >
                Start a Project
              </a>

            </div>

            <div className="hero-trust">
              <span>CONTENT WRITING</span>
              <i />
              <span>SEO BLOGS</span>
              <i />
              <span>CAPTIONS</span>
            </div>

          </Reveal>


          <Reveal className="hero-side">

            <HeroVisual />

          </Reveal>

        </div>

      </header>


      {/* =========================
          STATS
      ========================= */}

      <section className="stats-section">

        <div className="stats-grid">

          <div className="stat">
            <strong>
              <Counter target={50} />
            </strong>
            <span>Content Pieces</span>
          </div>

          <div className="stat">
            <strong>
              <Counter target={25} />
            </strong>
            <span>Projects</span>
          </div>

          <div className="stat">
            <strong>
              <Counter target={10} />
            </strong>
            <span>Creators</span>
          </div>

          <div className="stat">
            <strong>100%</strong>
            <span>Original Writing</span>
          </div>

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================= */}

      <section
        id="services"
        className="section"
      >

        <div className="section-heading">

          <Reveal>

            <span className="eyebrow">
              WHAT I DO
            </span>

            <h2>
              Content built for
              <span className="gradient-text">
                creators.
              </span>
            </h2>

            <p>
              Writing that balances clarity,
              personality, search intent and
              audience attention.
            </p>

          </Reveal>

        </div>


        <div className="services-grid">

          <ServiceCard
            number="01"
            icon="✦"
            title="Content Writing"
            description="Clear, useful and engaging content tailored to your audience, brand voice and niche."
          />

          <ServiceCard
            number="02"
            icon="⌕"
            title="SEO Blog Writing"
            description="Structured blog content built around search intent, relevant topics, readability and useful information."
          />

          <ServiceCard
            number="03"
            icon="#"
            title="SEO Optimized Captions"
            description="Captions designed to communicate quickly, encourage interaction and naturally include relevant search language."
          />

        </div>

      </section>


      {/* =========================
          PORTFOLIO
      ========================= */}

      <section
        id="work"
        className="section portfolio-section"
      >

        <Reveal>

          <span className="eyebrow">
            SELECTED WORK
          </span>

          <h2>
            Ideas turned into
            <span className="gradient-text">
              content.
            </span>
          </h2>

          <p className="section-intro">
            A selection of content concepts for
            money, motivation and creator-focused
            audiences.
          </p>

        </Reveal>


        <div className="portfolio-grid">

          <Reveal className="portfolio-large">
            <div className="portfolio-image">

              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85"
                alt="SEO blog writing"
              />

              <div className="portfolio-overlay">
                <span>SEO BLOG</span>
                <h3>
                  Online Income Guide
                </h3>
              </div>

            </div>
          </Reveal>


          <Reveal className="portfolio-small">

            <div className="portfolio-image">

              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85"
                alt="Motivation writing"
              />

              <div className="portfolio-overlay">
                <span>CONTENT</span>
                <h3>
                  Motivation Content
                </h3>
              </div>

            </div>

          </Reveal>


          <Reveal className="portfolio-small">

            <div className="portfolio-image">

              <img
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1000&q=85"
                alt="Social media captions"
              />

              <div className="portfolio-overlay">
                <span>CAPTIONS</span>
                <h3>
                  Creator Captions
                </h3>
              </div>

            </div>

          </Reveal>


          <Reveal className="portfolio-large">

            <div className="portfolio-image">

              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85"
                alt="Content strategy"
              />

              <div className="portfolio-overlay">
                <span>CONTENT STRATEGY</span>
                <h3>
                  Creator Content System
                </h3>
              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =========================
          WRITING SHOWCASE
      ========================= */}

      <section className="section writing-section">

        <Reveal>

          <span className="eyebrow">
            WRITING STYLE
          </span>

          <h2>
            Simple words.
            <br />
            <span className="gradient-text">
              Strong ideas.
            </span>
          </h2>

        </Reveal>


        <div className="writing-grid">

          <Reveal>

            <article className="quote-card">

              <div className="quote-tag">
                MONEY
              </div>

              <h3>
                "You don't need another
                money-making idea.
                You need a system."
              </h3>

              <p>
                Content focused on practical ideas
                instead of exaggerated promises,
                helping audiences understand the
                difference between consuming advice
                and actually building a skill.
              </p>

            </article>

          </Reveal>


          <Reveal>

            <article className="quote-card">

              <div className="quote-tag">
                MOTIVATION
              </div>

              <h3>
                "Motivation starts the work.
                Systems make the work easier
                to repeat."
              </h3>

              <p>
                Clear motivational content that
                connects mindset with practical
                action instead of relying only
                on generic quotes.
              </p>

            </article>

          </Reveal>

        </div>

      </section>


      {/* =========================
          PROCESS
      ========================= */}

      <section
        id="process"
        className="section"
      >

        <Reveal>

          <span className="eyebrow">
            WORKFLOW
          </span>

          <h2>
            From idea to
            <span className="gradient-text">
              publish-ready.
            </span>
          </h2>

        </Reveal>


        <div className="process-grid">

          <Reveal>
            <div className="process-card">
              <span>01</span>
              <h3>Research</h3>
              <p>
                Understand the topic, audience,
                search intent and content goal.
              </p>
            </div>
          </Reveal>


          <Reveal>
            <div className="process-card">
              <span>02</span>
              <h3>Structure</h3>
              <p>
                Develop the angle, headline,
                outline and key points.
              </p>
            </div>
          </Reveal>


          <Reveal>
            <div className="process-card">
              <span>03</span>
              <h3>Write</h3>
              <p>
                Turn the research into clear,
                useful and engaging content.
              </p>
            </div>
          </Reveal>


          <Reveal>
            <div className="process-card">
              <span>04</span>
              <h3>Optimize</h3>
              <p>
                Refine readability, SEO structure,
                clarity and final presentation.
              </p>
            </div>
          </Reveal>

        </div>

      </section>


      {/* =========================
          SKILLS
      ========================= */}

      <section className="section skills-section">

        <Reveal>

          <span className="eyebrow">
            CAPABILITIES
          </span>

          <h2>
            Focused on the
            <span className="gradient-text">
              fundamentals.
            </span>
          </h2>

        </Reveal>


        <div className="skills-container">

          <Skill
            name="Content Writing"
            percentage={95}
          />

          <Skill
            name="Blog Writing"
            percentage={92}
          />

          <Skill
            name="SEO Content"
            percentage={90}
          />

          <Skill
            name="Social Media Captions"
            percentage={94}
          />

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section
        id="contact"
        className="section"
      >

        <Reveal>

          <div className="cta">

            <div className="cta-orb" />

            <span className="eyebrow">
              HAVE A PROJECT?
            </span>

            <h2>
              Let's turn your
              <span className="gradient-text">
                idea into content.
              </span>
            </h2>

            <p>
              Need blog posts, creator content or
              SEO-focused captions for a money or
              motivation brand?
            </p>

            <MagneticButton href="mailto:your@email.com">
              Start a Project →
            </MagneticButton>

          </div>

        </Reveal>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footer-inner">

          <div>
            © 2026 ALBIN.
            All rights reserved.
          </div>

          <div className="socials">

            <a href="#">
              ◎
            </a>

            <a href="#">
              in
            </a>

            <a href="#">
              P
            </a>

            <a href="#">
              @
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
              }
