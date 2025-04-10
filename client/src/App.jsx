import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ChatLayout from "./Pages/ChatLayout"; // Assuming this is your Chat component
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/chat">Chat with AI</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
