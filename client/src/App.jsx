import ChatLayout from "./Pages/ChatLayout";
import HomePage from "./Pages/Home";
import { Database } from "lucide-react";
import "./assets/css/Nav.css";
//import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";

const App = () => {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <div className="logo">
            <Database className="logo-icon" />
            <h1>Talk to Database AI</h1>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#how-it-works">Working</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <Link to="/login" className="login-btn">
              Log In
            </Link>
            <Link to="/signup" className="signup-btn primary-btn">
              Sign Up
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/interface/:chatRoomId" element={<Interface />} />
          <Route path="/chat/:chatRoomId" element={<ChatLayout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
