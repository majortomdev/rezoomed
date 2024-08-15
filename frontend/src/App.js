import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Banner from "./components/Banner";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";
import Register from "./components/Register";
import URLs from "./components/URLs";
import DataTags from "./components/DataTags";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    //const username = localStorage.getItem("username");
    if (accessToken) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(accessToken);
      const expirationTime = decodedToken.exp * 1000 - Date.now();

      if (expirationTime <= 0) {
        handleLogout();
      } else {
        setTimeout(() => {
          handleLogout();
        }, expirationTime);
      }
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

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
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
          element={
            isAuthenticated ? (
              <DataTags onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
