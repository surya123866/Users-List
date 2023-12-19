import React, { useState } from "react";
import "./styles.scss";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError(""); // Reset error message

    // Validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Mock login logic (replace with actual authentication logic)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      // Set a session cookie or token upon successful login
      Cookies.set("Token", true);

      // Redirect to the dashboard or any desired page
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h1>Login to your Account</h1>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter EmailId"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the password"
        />
      </label>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleLogin}>Login</button>
      <hr className="horizontal-line" />
      <p>
        Don't have an account?{" "}
        <Link to={"/signUp"}>
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
