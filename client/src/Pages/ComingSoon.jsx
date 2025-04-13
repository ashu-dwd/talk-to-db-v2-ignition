import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faEnvelope,
  faClock,
  faChartLine,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "../assets/css/ComingSoon.css";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Launch in 45 days
  useEffect(() => {
    const timer = setInterval(() => {
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 45);
      const difference = launchDate - new Date();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="coming-soon-premium">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="content-card"
      >
        <div className="header">
          <div className="badge">
            <FontAwesomeIcon icon={faRocket} className="icon" />
            <span>COMING SOON</span>
          </div>
          <h1>Revolutionary Feature Launch</h1>
          <p className="subtitle">
            We're building something extraordinary that will transform your
            workflow. Join our exclusive waitlist for early access.
          </p>
        </div>

        <div className="countdown-container">
          <div className="countdown">
            <div className="countdown-item">
              <span className="number">{timeLeft.days}</span>
              <span className="label">Days</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="number">{timeLeft.hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="number">{timeLeft.minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="number">{timeLeft.seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>

        {!subscribed ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="subscribe-form"
          >
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="subscribe-btn">
              <FontAwesomeIcon icon={faBell} className="btn-icon" />
              Notify Me
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="success-message"
          >
            <h3>You're on the list!</h3>
            <p>We'll notify you when we launch.</p>
          </motion.div>
        )}

        <div className="progress-section">
          <div className="progress-header">
            <FontAwesomeIcon icon={faChartLine} className="progress-icon" />
            <span>Development Progress</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <span className="progress-percent">82%</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
