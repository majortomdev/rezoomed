import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Register from "./components/Register";
import URLs from "./components/URLs";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (accessToken) => {
        console.log("we HAVE accesstokn in handlelogin, look:    "+accessToken);
        localStorage.setItem("accessToken", accessToken);
        setIsAuthenticated(true);
        console.log("...iiiissssAuthenticated:   "+isAuthenticated);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Banner />
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/urls" /> : <Login onLogin={handleLogin} />}
                />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/urls" /> : <Register />} />
                <Route
                    path="/urls"
                    element={isAuthenticated ? <URLs onLogout={handleLogout} /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};


export default App;
