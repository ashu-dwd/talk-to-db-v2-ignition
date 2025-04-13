import React, { useState, useEffect } from "react";
import { FiClock, FiMail, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import "../assets/css/ComingSoon.css"; // We'll create this CSS file

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set launch date (2 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 2);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = launchDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribed with:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="coming-soon-container">
      <div className="stars"></div>
      <div className="twinkling"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="content"
      >
        <div className="badge">
          <FiSend className="rocket-icon" />
          <span>Coming Soon</span>
        </div>

        <h1>Our Next Generation Feature is Launching Soon!</h1>
        <p className="subtitle">
          We're working hard to bring you an amazing new experience. Stay tuned
          for updates and be the first to try it out!
        </p>

        <div className="countdown">
          <div className="countdown-item">
            <span className="number">{days}</span>
            <span className="label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="number">{hours}</span>
            <span className="label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="number">{minutes}</span>
            <span className="label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="number">{seconds}</span>
            <span className="label">Seconds</span>
          </div>
        </div>

        {!subscribed ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="subscribe-form"
          >
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for updates"
                required
              />
            </div>
            <button type="submit" className="subscribe-button">
              Notify Me
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="success-message"
          >
            <h3>Thank you for subscribing!</h3>
            <p>We'll notify you as soon as we launch.</p>
          </motion.div>
        )}

        <div className="progress-container">
          <div className="progress-label">
            <FiClock className="progress-icon" />
            <span>Development Progress</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          <span className="progress-percentage">75%</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
