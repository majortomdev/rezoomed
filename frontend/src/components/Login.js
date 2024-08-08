import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  //const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      onLogin();
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
