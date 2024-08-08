import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import URLs from "./components/URLs";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
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
              <URLs onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

// return (
//   <Router>
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/urls" />
//           ) : (
//             <Login onLogin={handleLogin} />
//           )
//         }
//       ></Route>

//       <Route
//         path="/register"
//         element={isAuthenticated ? <Navigate to="/urls" /> : <Register />}
//       ></Route>

//       <Route
//         path="/urls"
//         element={
//           isAuthenticated ? (
//             <URLs onLogout={handleLogout} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       ></Route>
//       <Navigate from="/" to="/login" />
//     </Routes>
//   </Router>
// );
