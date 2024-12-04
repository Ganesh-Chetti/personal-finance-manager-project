import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Expenses from "./Pages/Expenses";
import Summary from "./Pages/Summary";
//git 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("currentUser"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("currentUser"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/summary" element={<Summary />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
