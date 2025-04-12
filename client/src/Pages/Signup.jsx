import React, { useState } from "react";
import axios from "axios";
import "../assets/css/signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmission = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", cPassword);
    setLoading(true);
    setError(null);
    if (password !== cPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:5000/user/signup", { name, email, password })
      .then((response) => {
        console.log("Signup successful:", response.data);
        alert(response.data.msg);
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        setError("Signup failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-password">Confirm Password:</label>
            <input
              type="cpassword"
              id="cpassword"
              name="cpassword"
              onChange={(e) => setcPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="signup-btn"
            onClick={handleFormSubmission}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default Signup;
