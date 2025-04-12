import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Correct way to navigate

  const handleFormSubmission = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post("http://localhost:5000/user/login", { email, password })
      .then((response) => {
        console.log("Login successful:", response.data);
        alert("Login successful!");
        navigate("/chat"); // ✅ Redirect to chat
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      {error && <div className="error-message">{error}</div>}
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleFormSubmission}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
