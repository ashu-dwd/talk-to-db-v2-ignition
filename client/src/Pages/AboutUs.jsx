import React from "react";
import "../assets/css/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p className="about-tagline">
          Meet the team behind TalkToDB - passionate developers dedicated to
          making database interactions simple and intuitive.
        </p>
      </div>

      <div className="team-section">
        <div className="team-member">
          <div className="member-image-container">
            <img
              src="/api/placeholder/400/400"
              alt="Alex Johnson"
              className="member-image"
            />
          </div>
          <div className="member-info">
            <h2>Alex Johnson</h2>
            <h3>Co-Founder & Lead Developer</h3>
            <p>
              Alex has over 8 years of experience in database architecture and
              full-stack development. After facing persistent challenges with
              database interactions in previous roles, Alex was inspired to
              create a solution that would make database management more
              accessible.
            </p>
            <p>
              With a Master's degree in Computer Science from Stanford
              University, Alex combines academic knowledge with practical
              experience to drive the technical direction of TalkToDB. When not
              coding, Alex enjoys hiking and playing chess.
            </p>
            <div className="member-social">
              <a href="#" className="social-link">
                LinkedIn
              </a>
              <a href="#" className="social-link">
                GitHub
              </a>
              <a href="#" className="social-link">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="team-member reverse">
          <div className="member-image-container">
            <img
              src="/api/placeholder/400/400"
              alt="Sam Rivera"
              className="member-image"
            />
          </div>
          <div className="member-info">
            <h2>Sam Rivera</h2>
            <h3>Co-Founder & UI/UX Lead</h3>
            <p>
              Sam brings 6 years of specialized experience in UI/UX design with
              a focus on creating intuitive interfaces for complex technical
              products. With a background in cognitive psychology and
              human-computer interaction, Sam ensures that TalkToDB remains
              user-friendly despite its powerful capabilities.
            </p>
            <p>
              Prior to co-founding TalkToDB, Sam worked with several tech
              startups to improve their user experience design processes. Sam
              holds a degree in Human-Computer Interaction from Carnegie Mellon
              University and enjoys photography and electronic music production
              in free time.
            </p>
            <div className="member-social">
              <a href="#" className="social-link">
                LinkedIn
              </a>
              <a href="#" className="social-link">
                Dribbble
              </a>
              <a href="#" className="social-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="company-values">
        <h2>Our Mission</h2>
        <p>
          At TalkToDB, we believe that database interaction shouldn't require
          complex query languages or specialized knowledge. Our mission is to
          democratize database access and empower teams to extract valuable
          insights quickly and efficiently.
        </p>
        <p>
          We're committed to building tools that transform the way people work
          with data, making the process more intuitive, collaborative, and
          productive.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
