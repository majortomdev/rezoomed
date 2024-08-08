import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhhh");
    try {
      await axios.post("http://localhost:5000/api/register", {
        email,
        username,
        password,
      });
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setError("Registration failied");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
