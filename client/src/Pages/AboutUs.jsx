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
              src="/utkrisht.png.jpg"
              alt="Utkrisht Patel"
              className="member-image"
            />
          </div>
          <div className="member-info">
            <h2>Utkrisht Patel </h2>
            <h3> Frontend web Developer</h3>
            <p>
              {" "}
              Passionate Computer science student with a strong foundation in
              Programming and a keen interest in technology. I'm adept at
              leveraging my technical skills to tackle real- world challenges.
              skills that I am excellent at required for frontend development
              are HTML, CSS and JavaScript . And also excellent knowledge of C
              programming language. I demonstrate strong analysis and problem -
              solving abilities by effective communication and teamwork skills.
              I have participated in many hackathons and my team was a winner in
              PACS. I along with my team, also carry out independent projects. I
              am excited to leverage my knowledge and enthusiasm to contribute
              to impactful projects and grow within a dynamic and forward -
              thinking organization.
            </p>
            <p>
              Pursuing With a Master's degree in Computer Science from Gautam
              Buddha University, Let's connect and explore opportunities to
              innovate and make a difference in the tech world together!.
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
              src="/ashu.jpg"
              alt="Raghvendra Dwivedi"
              className="member-image"
            />
          </div>
          <div className="member-info">
            <h2>Raghvendra Dwivedi ​</h2>
            <h3> Full Stack Web Developer </h3>
            <p>
              <b>
                Aspiring Web Developer | Passionate About Building Dynamic
                Websites{" "}
              </b>{" "}
            </p>
            <p>
              As a fresher in the field of web development, I have hands-on
              experience in creating interactive and responsive websites. I’ve
              honed my skills in HTML, CSS, JavaScript, jQuery, PHP, and
              Node.js, building projects that showcase my ability to blend
              creativity with functionality. What I Bring: A strong foundation
              in front-end and back-end development. A knack for solving
              problems and learning new technologies. A portfolio of projects,
              including an e-commerce site, chat app, or dynamic forms. I’m
              eager to bring my skills to a professional setting, contribute to
              innovative projects, and grow as a developer. Let’s connect and
              create something amazing together!
            </p>
            <div className="member-social">
              <a
                href="www.linkedin.com/in/raghav-dwd"
                target="_blank"
                className="social-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ashu-dwd"
                target="_blank"
                className="social-link"
              >
                Github
              </a>
              <a
                href="https://www.instagram.com/raghavv.dwivedi/"
                target="_blank"
                className="social-link"
              >
                Instagram
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
