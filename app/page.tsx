"use client";

const DEV_URL = "https://dev.academy.country";

function trackCta(name: string) {
  window.dispatchEvent(
    new CustomEvent("academy:cta", { detail: { name, href: DEV_URL } }),
  );

  const dataLayer = (
    window as Window & { dataLayer?: Array<Record<string, string>> }
  ).dataLayer;
  dataLayer?.push({
    event: "academy_cta_click",
    cta_name: name,
    cta_href: DEV_URL,
  });
}

function DevLink({
  children,
  location,
  className = "button button-primary",
}: {
  children: React.ReactNode;
  location: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={DEV_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(location)}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

const foundations = [
  {
    number: "01",
    title: "Structured learning",
    text: "Focused lessons, progressive paths and assessment loops designed to make learning legible.",
  },
  {
    number: "02",
    title: "Proof-of-Knowledge",
    text: "A proposed validation layer for turning eligible learning events into credible evidence.",
  },
  {
    number: "03",
    title: "Portable reputation",
    text: "A future-facing model for credentials and achievements that can travel with the learner.",
  },
  {
    number: "04",
    title: "Programmable participation",
    text: "$Neurons is designed to connect validated learning with access, utility and governance.",
  },
];

const roadmap = [
  {
    phase: "Now",
    title: "Product foundation",
    text: "Learner journeys, content flows, progress logic and controlled previews.",
    state: "active",
  },
  {
    phase: "Next",
    title: "On-chain layer",
    text: "Token, reward controls, credential models and wallet integration.",
  },
  {
    phase: "Then",
    title: "Security & operations",
    text: "Testnet validation, monitoring, audits and infrastructure hardening.",
  },
  {
    phase: "Later",
    title: "Ecosystem expansion",
    text: "Institutional integrations, marketplace, governance and multi-chain research.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand" href="#top" aria-label="Academy home">
            <span className="brand-symbol" aria-hidden="true">
              <img src="/assets/Axodus_logo.svg" alt="" />
            </span>
            <span>
              <strong>ACADEMY</strong>
              <small>AN AXODUS INITIATIVE</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#thesis">Thesis</a>
            <a href="#system">System</a>
            <a href="#architecture">Architecture</a>
            <a href="#roadmap">Roadmap</a>
          </nav>

          <DevLink location="header" className="button button-compact">
            Live build
          </DevLink>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="pulse" />
                Open development · Experimental
              </div>
              <h1>
                Knowledge should create
                <span>verifiable progress.</span>
              </h1>
              <p className="hero-lede">
                Academy is an open-development learning infrastructure exploring
                how education, Proof-of-Knowledge, portable reputation and
                programmable participation can work together.
              </p>
              <div className="hero-actions">
                <DevLink location="hero">Explore the live build</DevLink>
                <a className="button button-secondary" href="#architecture">
                  Understand the architecture
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="dev-note">
                <span aria-hidden="true">◌</span>
                Public development environment. Features are incomplete,
                evolving and not production-ready.
              </p>
            </div>

            <div className="concept-map" aria-label="Academy concept map">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="core">
                <img className="core-mark" src="/assets/A-icon.png" alt="" />
                <span>PROOF OF</span>
                <strong>KNOWLEDGE</strong>
                <small>VALIDATION LAYER</small>
              </div>
              <div className="concept-node node-learning">
                
                <strong>Learning</strong>
                <small>Structured action</small>
              </div>
              <div className="concept-node node-evidence">
                
                <strong>Evidence</strong>
                <small>Verified progress</small>
              </div>
              <div className="concept-node node-reputation">
                
                <strong>Reputation</strong>
                <small>Portable history</small>
              </div>
              <div className="concept-node node-participation">
                
                <strong>Participation</strong>
                <small>Utility & governance</small>
              </div>
            </div>
          </div>

          <div className="container proof-line">
            <span>OFF-CHAIN EXPERIENCE</span>
            <i />
            <span>ON-CHAIN EVIDENCE</span>
            <i />
            <span>HUMAN PROGRESSION</span>
          </div>
        </section>

        <section className="section light-section" id="thesis">
          <div className="container split-heading">
            <div>
              <span className="section-label">01 · THE THESIS</span>
              <h2>Completion is not evidence of understanding.</h2>
            </div>
            <div className="section-intro">
              <p>
                Digital education can track attendance, time and completion. It
                is less effective at proving what a learner understood, how that
                knowledge evolved and whether it can create value beyond one
                platform.
              </p>
              <p>
                Academy is researching an infrastructure where meaningful
                learning can leave a trace that is credible, useful and
                portable.
              </p>
            </div>
          </div>
          <div className="container problem-grid">
            <article>
              
              <h3>Weak signals</h3>
              <p>Completion alone says little about comprehension or ability.</p>
            </article>
            <article>
              
              <h3>Closed records</h3>
              <p>Educational progress usually stays locked inside one database.</p>
            </article>
            <article>
              
              <h3>Fragmented trust</h3>
              <p>Credentials are difficult to verify and rarely interoperable.</p>
            </article>
            <article>
              
              <h3>Disconnected value</h3>
              <p>Learning, contribution and participation remain separate.</p>
            </article>
          </div>
        </section>

        <section className="section dark-section" id="system">
          <div className="container section-title-center">
            <span className="section-label">02 · THE SYSTEM</span>
            <h2>From learning activity to ecosystem participation.</h2>
            <p>
              A modular concept connecting experience, validation, reputation
              and utility without forcing every interaction on-chain.
            </p>
          </div>
          <div className="container foundation-grid">
            {foundations.map((item) => (
              <article key={item.number}>
                
                <div className="card-glyph" aria-hidden="true">
                  {item.number === "01"
                    ? "↗"
                    : item.number === "02"
                      ? "◇"
                      : item.number === "03"
                        ? "◎"
                        : "⌁"}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section pok-section">
          <div className="container pok-layout">
            <div>
              <span className="section-label">03 · PROOF-OF-KNOWLEDGE</span>
              <h2>Evidence first. Issuance controlled.</h2>
              <p>
                The proposed Proof-of-Knowledge model evaluates eligible
                educational activity under explicit policies. Presence alone is
                not enough.
              </p>
            </div>
            <div className="policy-panel">
              <div className="policy-score">
                <div>
                  <strong>PoK</strong>
                  <small>POLICY ENGINE</small>
                </div>
              </div>
              <ul>
                <li>
                  Quality of responses
                </li>
                <li>
                  Consistency over time
                </li>
                <li>
                  Difficulty and completion
                </li>
                <li>
                  Budget and anti-abuse controls
                </li>
              </ul>
            </div>
          </div>
          <div className="container guardrail-row">
            <span>Daily learner limits</span>
            <span>Epoch budgets</span>
            <span>Verifiable claims</span>
            <span>Cooldown policies</span>
            <span>Fail-closed controls</span>
          </div>
        </section>

        <section className="section token-section">
          <div className="container token-layout">
            <div className="token-neurons" aria-hidden="true">
              <span></span>
            </div>
            <div className="token-copy">
              <span className="section-label">04 · THE UTILITY LAYER</span>
              <h2>$Neurons connects learning with participation.</h2>
              <p>
                $Neurons is the proposed utility and governance layer of the
                Academy ecosystem. It is being designed to support controlled
                learning incentives, access, payments, benefits and
                participation — not financial promises.
              </p>
            </div>
            <div className="utility-list">
              <div>
                <span>{'>'}</span>
                <strong>Learning incentives</strong>
              </div>
              <div>
                <span>{'>'}</span>
                <strong>Access & payments</strong>
              </div>
              <div>
                <span>{'>'}</span>
                <strong>Creator alignment</strong>
              </div>
              <div>
                <span>{'>'}</span>
                <strong>Governance</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section architecture-section" id="architecture">
          <div className="container split-heading architecture-heading">
            <div>
              <span className="section-label">05 · ARCHITECTURE</span>
              <h2>The right execution layer for every event.</h2>
            </div>
            <div className="section-intro">
              <p>
                Academy is being designed as a hybrid system: fast learning
                experiences remain off-chain, while selected evidence,
                permissions and economic actions can move to verifiable
                infrastructure as the platform matures.
              </p>
            </div>
          </div>
          <div className="container architecture-flow">
            <article>
              <span>EXPERIENCE</span>
              <strong>Learner application</strong>
              <small>Courses · quizzes · progress</small>
            </article>
            <b aria-hidden="true">→</b>
            <article>
              <span>SERVICES</span>
              <strong>Authenticated platform</strong>
              <small>Content · policy · integrity</small>
            </article>
            <b aria-hidden="true">→</b>
            <article>
              <span>EVIDENCE</span>
              <strong>Distributed records</strong>
              <small>Storage · pointers · permissions</small>
            </article>
            <b aria-hidden="true">→</b>
            <article>
              <span>UTILITY</span>
              <strong>Controlled contracts</strong>
              <small>Rewards · credentials · governance</small>
            </article>
          </div>
          <div className="container architecture-status">
            <div>
              <span className="status-dot status-built" />
              <strong>In active development</strong>
              <small>Learner experience, progress logic and preview flows</small>
            </div>
            <div>
              <span className="status-dot status-research" />
              <strong>Under validation</strong>
              <small>Authority boundaries, policy controls and contract scaffolds</small>
            </div>
            <div>
              <span className="status-dot status-planned" />
              <strong>Planned infrastructure</strong>
              <small>Production issuance, credentials and multi-chain operation</small>
            </div>
          </div>
        </section>

        <section className="section applications-section">
          <div className="container section-title-center">
            <span className="section-label">06 · APPLICATIONS</span>
            <h2>One learning layer. Multiple institutional contexts.</h2>
          </div>
          <div className="container application-list">
            {[
              "Universities",
              "Corporate training",
              "Technical certification",
              "Web3 communities",
              "Developer ecosystems",
              "Institutional onboarding",
              "Knowledge-based loyalty",
              "White-label learning",
            ].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>
        </section>

        <section className="section roadmap-section" id="roadmap">
          <div className="container split-heading">
            <div>
              <span className="section-label">07 · ROADMAP</span>
              <h2>Built through deliberate, controlled phases.</h2>
            </div>
            <div className="section-intro">
              <p>
                The roadmap prioritizes a credible learning experience first,
                then introduces sensitive infrastructure behind progressively
                stronger security and governance gates.
              </p>
            </div>
          </div>
          <div className="container roadmap-grid">
            {roadmap.map((item, index) => (
              <article className={item.state === "active" ? "active" : ""} key={item.phase}>
                <div>
                  <span>{item.phase}</span>
                  
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="build-section">
          <div className="container build-layout">
            <div>
              <span className="section-label">BUILT IN THE OPEN</span>
              <h2>Observe the architecture becoming a platform.</h2>
              <p>
                The public development environment exposes an evolving
                implementation for researchers, partners and investors. Expect
                incomplete flows, simulated data and frequent change.
              </p>
              <div className="hero-actions">
                <DevLink location="final">Explore the live build</DevLink>
                <a className="button button-secondary" href="mailto:academy@axodus.country">
                  Discuss a partnership
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="build-terminal" aria-label="Development status">
              <div className="terminal-top">
                <span />
                <span />
                <span />
                <small>academy / open-development</small>
              </div>
              <div className="terminal-body">
                <p>
                  <span>STATUS</span> ACTIVE DEVELOPMENT
                </p>
                <p>
                  <span>ENVIRONMENT</span> PUBLIC / EXPERIMENTAL
                </p>
                <p>
                  <span>PRODUCTION</span> NOT AUTHORIZED
                </p>
                <p>
                  <span>FOCUS</span> LEARNING → EVIDENCE
                </p>
                <div className="terminal-line" />
                <small>Last reviewed · 2026</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-layout">
          <a className="brand" href="#top" aria-label="Academy home">
            <span className="brand-symbol" aria-hidden="true">
              <img src="/assets/Axodus_logo.svg" alt="" />
            </span>
            <span>
              <strong>ACADEMY</strong>
              <small>AN AXODUS INITIATIVE</small>
            </span>
          </a>
          <p>
            An open-development infrastructure for verifiable learning.
          </p>
          <span>© 2026 AXODUS</span>
        </div>
      </footer>
    </>
  );
}
