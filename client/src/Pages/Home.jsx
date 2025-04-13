import React, { useState } from "react";
import "../assets/css/Home.css";
import {
  Lock,
  Database,
  MessageSquare,
  Shield,
  Code,
  Server,
  Github,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Settings,
  Activity,
} from "lucide-react";

const HomePage = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  const handleGetStarted = () => {
    setShowConnectionModal(true);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Database Experience with Natural Language AI</h1>
          <p>
            Seamlessly integrate our AI solution into your existing MySQL
            systems. Empower your team to query databases using plain English,
            boosting productivity and democratizing data access across your
            organization.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              Schedule Integration Demo
            </button>
            <button className="secondary-btn">Watch Success Stories</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/integration.png"
            alt="Engineers integrating Talk to Database AI with company systems"
          />
        </div>
      </section>

      {/* Integration Value Section - NEW */}
      <section className="integration-value">
        <h2>Why Companies Choose Our Integration</h2>
        <div className="value-grid">
          <div className="value-card">
            <TrendingUp className="value-icon" />
            <h3>80% Faster Data Access</h3>
            <p>
              Companies report teams accessing critical data insights 80% faster
              after integration.
            </p>
          </div>
          <div className="value-card">
            <Users className="value-icon" />
            <h3>Cross-Department Adoption</h3>
            <p>
              Enable non-technical teams to leverage database insights without
              SQL expertise.
            </p>
          </div>
          <div className="value-card">
            <Clock className="value-icon" />
            <h3>2-Week Integration</h3>
            <p>
              Our engineering team completes most integrations within two weeks,
              minimizing disruption.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Enterprise-Ready Integration</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <MessageSquare className="feature-icon" />
            <h3>Natural Language Processing</h3>
            <p>
              Our AI translates plain English to optimized SQL, allowing anyone
              in your organization to extract value from your databases without
              writing code.
            </p>
          </div>
          <div className="feature-card">
            <Lock className="feature-icon" />
            <h3>Secure Integration</h3>
            <p>
              End-to-end encryption with zero data extraction from your systems.
              All processing happens within your security perimeter.
            </p>
          </div>
          <div className="feature-card">
            <Settings className="feature-icon" />
            <h3>Custom Integration</h3>
            <p>
              Our engineers work directly with your team to customize the
              implementation for your specific MySQL environment and business
              needs.
            </p>
          </div>
          <div className="feature-card">
            <Code className="feature-icon" />
            <h3>Developer Transparency</h3>
            <p>
              Full visibility into generated SQL queries for your development
              team, with option to review and approve query patterns.
            </p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Permission Management</h3>
            <p>
              Integrates with your existing user permission systems to maintain
              proper data access controls across your organization.
            </p>
          </div>
          <div className="feature-card">
            <Activity className="feature-icon" />
            <h3>Performance Optimized</h3>
            <p>
              Designed to work with your existing infrastructure without adding
              significant overhead to your database systems.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section - UPDATED */}
      <section id="how-it-works" className="how-it-works">
        <h2>Our Integration Process</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Initial Assessment</h3>
            <p>
              Our engineers analyze your database structure and discuss
              integration requirements.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Custom Integration</h3>
            <p>
              We work with your development team to integrate our solution into
              your codebase.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Training & Deployment</h3>
            <p>
              We train both the AI on your schema and your team on using the new
              capabilities.
            </p>
          </div>
        </div>
        <div className="demo-container">
          <img src="/image.png" alt="Integration process diagram" />
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security">
        <div className="security-content">
          <h2>Enterprise Security By Design</h2>
          <ul className="security-features">
            <li>
              <Shield className="security-icon" />
              <div>
                <h3>On-Premise Deployment</h3>
                <p>
                  Our solution can be fully deployed within your infrastructure,
                  ensuring data never leaves your security perimeter.
                </p>
              </div>
            </li>
            <li>
              <Lock className="security-icon" />
              <div>
                <h3>Zero Data Extraction</h3>
                <p>
                  Unlike other AI solutions, we don't extract your data for
                  training. All processing happens within your environment.
                </p>
              </div>
            </li>
            <li>
              <Database className="security-icon" />
              <div>
                <h3>Compliance Friendly</h3>
                <p>
                  Built with GDPR, HIPAA, and other regulatory frameworks in
                  mind, maintaining your compliance posture.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="security-image">
          <img
            src="/secure.png"
            alt="Secure integration architecture diagram"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Engineering Success Stories</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "After integrating Talk to Database AI, our product teams can
              access data insights without constantly requesting help from our
              already busy database engineers. The integration was smooth and
              their team was exceptional in understanding our codebase."
            </p>
            <div className="testimonial-author">
              <img
                src="/profile.png"
                alt="Profile"
                className="testimonial-avatar"
              />
              <div>
                <h4>David Morrison</h4>
                <p>CTO, HealthTech Solutions</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>
              "The integration team at Talk to Database AI worked seamlessly
              with our developers. They understood our security concerns and
              customized the solution to work within our strict regulatory
              environment. Now we have non-technical teams accessing the
              database insights they need without risking data integrity."
            </p>
            <div className="testimonial-author">
              <img
                src="/woman.png"
                alt="Profile"
                className="testimonial-avatar"
              />
              <div>
                <h4>Priya Sharma</h4>
                <p>VP of Engineering, FinanceTrust Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - UPDATED */}
      <section id="pricing" className="pricing">
        <h2>Integration Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Demo Integration</h3>
            <div className="price">
              $0<span></span>
            </div>
            <ul>
              <li>Free technical assessment</li>
              <li>Demo with your dummy database</li>
              <li>Integration consultation</li>
              <li>ROI projection report</li>
              <li>No commitment required</li>
            </ul>
            <button className="secondary-btn">Schedule Demo</button>
          </div>
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h3>Standard Integration</h3>
            <div className="price">
              $100<span>/year</span>
            </div>
            <ul>
              <li>Full system integration</li>
              <li>Engineering support</li>
              <li>1-year technical support</li>
              <li>Custom training for your team</li>
              <li>Performance optimization</li>
              <li>Quarterly system checkups</li>
            </ul>
            <button className="primary-btn">Get Started</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise Integration</h3>
            <div className="price">
              $500<span>/lifetime</span>
            </div>
            <ul>
              <li>Everything in Standard plus:</li>
              <li>Lifetime support & updates</li>
              <li>Priority engineering assistance</li>
              <li>Custom feature development</li>
              <li>Dedicated integration specialist</li>
              <li>Annual system audits & optimization</li>
            </ul>
            <button className="secondary-btn">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Transform How Your Company Uses Data?</h2>
        <p>Schedule a consultation with our integration engineers today.</p>
        <button className="primary-btn">Book Integration Assessment</button>
      </section>

      {/* Connection Modal */}
      {showConnectionModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowConnectionModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Schedule Your Integration Demo</h2>
            <form className="connection-form">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Your company" />
              </div>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Business Email</label>
                <input type="email" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label>Database System</label>
                <select>
                  <option value="">Select your database system</option>
                  <option value="mysql">MySQL</option>
                  <option value="postgres">PostgreSQL</option>
                  <option value="mssql">Microsoft SQL Server</option>
                  <option value="oracle">Oracle</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Team Size</label>
                <select>
                  <option value="">Select team size</option>
                  <option value="small">1-10 employees</option>
                  <option value="medium">11-50 employees</option>
                  <option value="large">51-200 employees</option>
                  <option value="enterprise">201+ employees</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowConnectionModal(false)}
                >
                  Cancel
                </button>
                <a className="primary-btn" href="mailto:dwivediji425@gmail.com">
                  Schedule Demo
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Database className="logo-icon" />
            <h3>Talk to Database AI</h3>
            <p>
              Seamlessly integrate natural language capabilities into your
              existing database systems.
            </p>
            <div className="social-links">
              <a href="#">
                <Github />
              </a>
              <a href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H2V21H6V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Integration</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#security">Security</a>
              <a href="#">Technology</a>
              <a href="#">Case Studies</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about-us">About Us</a>
              <a href="/about-us">Engineering Team</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Talk to Database AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Integration Agreement</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
