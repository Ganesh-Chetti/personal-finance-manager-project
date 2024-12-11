import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/home.css";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("Please ensure you pay your pending bills, EMIs, and other financial obligations.");
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setIsLoggedIn(true);
      setUser(currentUser); // Set the logged-in user


      if (location.state?.fromLogin) {
        const today = new Date();
        const specificDates = [25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5];
        if (specificDates.includes(today.getDate())) {
          setTimeout(() => {
            setShowAlert(true);
          }, 1000); // Delay alert by 1 second
        }
      }
    }
  }, [location]);

  const handleIgnore = () => {
    setShowAlert(false); 
    setTimeout(() => {
      setShowAlert(true); // Show the alert again after 5 seconds
    }, 5000); 
  };
  
  const handlePaid = () => {
    setAlertContent("Thank you for confirming.");
    setAlertSuccess(true);
    setTimeout(() => setShowAlert(false), 2000); 
  };
  

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Finance Manager</h1>
        </div>
        <div className="navbar-links">
          {isLoggedIn ? (
            <div className="user-profile">
              <FaUserCircle
                size={32}
                className="user-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <span className="user-name">{user?.username}</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="nav-btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="nav-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {isLoggedIn ? (
        <div className="carousel-cards">
          <div className="card" onClick={() => navigate("/expenses")}>
            <h3>Expenses</h3>
            <p>Track your daily expenses easily and stay organized.</p>
          </div>
          <div className="card" onClick={() => navigate("/summary")}>
            <h3>Summary</h3>
            <p>View an overview of your spending and savings.</p>
          </div>
        </div>
      ) : (
        <div className="login-message">
          <p>You must be logged in to view Expenses and Summary.</p>
          <button onClick={() => navigate("/login")} className="login-btn">
            Login / Sign Up
          </button>
        </div>
      )}

      {showAlert && (
        <div className={`custom-alert ${alertSuccess ? "alert-success" : ""}`}>
          <div className="alert-header">
            <h3>Reminder</h3>
          </div>
          <div className="alert-content">{alertContent}</div>
          {!alertSuccess && (
            <div className="alert-footer">
              <button className="alert-btn paid-btn" onClick={handlePaid}>
                Paid
              </button>
              <button className="alert-btn ignore-btn" onClick={handleIgnore}>
                Ignore
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
