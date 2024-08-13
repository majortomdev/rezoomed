import React, { useState, useEffect } from "react";
//import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Register from "./components/Register";
import URLs from "./components/URLs";
import NoteTags from "./components/NoteTags";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    //const username = localStorage.getItem("username");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (accessToken, username) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <Router>
      <Banner />
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/urls" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/urls" /> : <Register />}
        />
        <Route
          path="/urls"
          element={
            isAuthenticated ? (
              <URLs onLogout={handleLogout} username={username} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notes"
          element={isAuthenticated ? <NoteTags /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
