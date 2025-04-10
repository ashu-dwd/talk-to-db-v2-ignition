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
          <h1>Talk to Your MySQL Database Using Natural Language</h1>
          <p>
            Securely interact with your MySQL database through AI-powered,
            end-to-end encrypted conversations. No more complex queries, just
            ask in plain English.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="secondary-btn">Watch Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/api/placeholder/500/400"
            alt="Chat interface with database"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <MessageSquare className="feature-icon" />
            <h3>Natural Language Queries</h3>
            <p>
              Ask questions about your data in plain English. Our AI translates
              your questions into optimized SQL.
            </p>
          </div>
          <div className="feature-card">
            <Lock className="feature-icon" />
            <h3>End-to-End Encryption</h3>
            <p>
              All conversations and database connections are fully encrypted for
              ultimate security.
            </p>
          </div>
          <div className="feature-card">
            <Database className="feature-icon" />
            <h3>MySQL Support</h3>
            <p>
              Specialized for MySQL databases with support for complex queries
              and schema understanding.
            </p>
          </div>
          <div className="feature-card">
            <Code className="feature-icon" />
            <h3>Query Transparency</h3>
            <p>
              View the generated SQL for every question to understand exactly
              what's being executed.
            </p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Role-Based Access</h3>
            <p>
              Control who can view, query, or modify your database with granular
              permissions.
            </p>
          </div>
          <div className="feature-card">
            <Server className="feature-icon" />
            <h3>Local Deployment</h3>
            <p>
              Install within your network for additional security and compliance
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security">
        <div className="security-content">
          <h2>Enterprise-Grade Security</h2>
          <ul className="security-features">
            <li>
              <Shield className="security-icon" />
              <div>
                <h3>End-to-End Encryption</h3>
                <p>
                  All communications between you, our AI, and your database are
                  fully encrypted.
                </p>
              </div>
            </li>
            <li>
              <Lock className="security-icon" />
              <div>
                <h3>Zero Data Storage</h3>
                <p>
                  We don't store your queries or results. Everything happens in
                  your secure session.
                </p>
              </div>
            </li>
            <li>
              <Database className="security-icon" />
              <div>
                <h3>Read-Only Mode</h3>
                <p>
                  Option to restrict to SELECT queries only, preventing any
                  modifications to your data.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="security-image">
          <img
            src="/api/placeholder/450/350"
            alt="Database security illustration"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Your Database</h3>
            <p>
              Securely connect to your MySQL database using encrypted
              credentials.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Ask Questions</h3>
            <p>Chat with the AI about your data using natural language.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>
              Receive clear answers, visualizations, and the option to view the
              generated SQL.
            </p>
          </div>
        </div>
        <div className="demo-container">
          <img src="/api/placeholder/800/400" alt="Application demo" />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <h2>Simple, Transparent Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">
              $0<span>/month</span>
            </div>
            <ul>
              <li>Connect 1 database</li>
              <li>100 queries per month</li>
              <li>Basic visualizations</li>
              <li>Community support</li>
            </ul>
            <button className="secondary-btn">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">
              $49<span>/month</span>
            </div>
            <ul>
              <li>Connect 5 databases</li>
              <li>Unlimited queries</li>
              <li>Advanced visualizations</li>
              <li>Priority support</li>
              <li>Query history</li>
            </ul>
            <button className="primary-btn">Get Started</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">
              Custom<span></span>
            </div>
            <ul>
              <li>Unlimited databases</li>
              <li>Unlimited queries</li>
              <li>Custom AI training</li>
              <li>Dedicated support</li>
              <li>SSO integration</li>
              <li>On-premises option</li>
            </ul>
            <button className="secondary-btn">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Talk to Database AI has transformed how our analysts interact
              with our data. No more waiting for the SQL experts!"
            </p>
            <div className="testimonial-author">
              <img
                src="/api/placeholder/50/50"
                alt="Profile"
                className="testimonial-avatar"
              />
              <div>
                <h4>Sarah Johnson</h4>
                <p>Data Analytics Lead, TechCorp</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>
              "The end-to-end encryption gives us confidence that our sensitive
              data remains secure while using this innovative tool."
            </p>
            <div className="testimonial-author">
              <img
                src="/api/placeholder/50/50"
                alt="Profile"
                className="testimonial-avatar"
              />
              <div>
                <h4>Michael Chen</h4>
                <p>CTO, SecureFinance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Talk to Your Database?</h2>
        <p>Get started with a free trial today. No credit card required.</p>
        <button className="primary-btn">Start Free Trial</button>
      </section>

      {/* Connection Modal */}
      {showConnectionModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowConnectionModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Connect to Your MySQL Database</h2>
            <form className="connection-form">
              <div className="form-group">
                <label>Host</label>
                <input type="text" placeholder="localhost or IP address" />
              </div>
              <div className="form-group">
                <label>Port</label>
                <input type="text" placeholder="3306" />
              </div>
              <div className="form-group">
                <label>Database Name</label>
                <input type="text" placeholder="my_database" />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="username" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowConnectionModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Connect
                </button>
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
              Making database interactions intuitive through natural language.
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
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
              <a href="#">Integrations</a>
              <a href="#">Updates</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Tutorials</a>
              <a href="#">Blog</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
              <a href="#">Partners</a>
              <a href="#">Legal</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Talk to Database AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
