import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css"; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>MyExpenseTracker</h2>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/expenses" className="navbar-link">Expenses</Link>
          <Link to="/summary" className="navbar-link">Summary</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
