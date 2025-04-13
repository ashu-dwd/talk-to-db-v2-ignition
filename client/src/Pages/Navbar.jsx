import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.jsx";
import {
  FaDatabase,
  FaUser,
  FaCog,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
        <FaDatabase className="logo-icon" />
        TalkToDB
      </Link>

      <div className="menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link
          to="/about-us"
          className="nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          to="/features"
          className="nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className="nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Pricing
        </Link>

        {isLoggedIn ? (
          <div className="user-info">
            <span className="user-greeting">
              Welcome, <span className="user-name">{user?.name || "User"}</span>
            </span>
            <div className="dropdown">
              <div className="user-avatar">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </div>
              <div className="dropdown-content">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className="dropdown-icon" /> My Profile
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaCog className="dropdown-icon" /> Settings
                </Link>
                <Link
                  to="/dashboard"
                  className="dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaTachometerAlt className="dropdown-icon" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <FaSignOutAlt className="dropdown-icon" /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link
              to="/login"
              className="btn btn-outline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// CSS (can be in a separate file or CSS-in-JS)
const styles = `
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4895ef;
  --dark-color: #1a1a2e;
  --light-color: #f8f9fa;
  --success-color: #4cc9f0;
  --text-color: #333;
  --text-light: #6c757d;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 5%;
  background-color: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: 700;
  transition: var(--transition);
}

.logo:hover {
  color: var(--secondary-color);
  transform: translateY(-2px);
}

.logo-icon {
  margin-right: 0.5rem;
  font-size: 2rem;
  color: var(--accent-color);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color:  black;
  font-weight: 500;
  font-size: 1.1rem;
  transition: var(--transition);
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  font-weight: 500;
  color: var(--text-light);
}

.user-name {
  font-weight: 600;
  color: var(--primary-color);
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  border: none;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(67, 97, 238, 0.3);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background-color: #6495ED;
  color: white;
  transform: translateY(-2px);
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: var(--transition);
}

.user-avatar:hover {
  transform: scale(1.1);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 1;
  overflow: hidden;
  margin-top: 0.5rem;
}

.dropdown:hover .dropdown-content {
  display: block;
  animation: fadeIn 0.3s;
}

.dropdown-item {
  padding: 0.8rem 1rem;
  text-decoration: none;
  display: block;
  color: var(--text-color);
  transition: var(--transition);
  border-bottom: 1px solid #f0f0f0;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: var(--primary-color);
  padding-left: 1.2rem;
}

.dropdown-icon {
  margin-right: 0.5rem;
  width: 20px;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.menu-toggle {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--primary-color);
  background: none;
  border: none;
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 80%;
    height: calc(100vh - 80px);
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    transition: var(--transition);
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    z-index: 999;
    gap: 1.5rem;
  }

  .nav-links.active {
    left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .btn {
    width: 100%;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 1.5rem;
  }

  .dropdown-content {
    position: static;
    box-shadow: none;
    display: none;
    margin-top: 1rem;
  }

  .dropdown:hover .dropdown-content {
    display: none;
  }

  .dropdown.active .dropdown-content {
    display: block;
    animation: none;
  }
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
