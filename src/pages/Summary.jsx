import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import '../styles/summary.css'; // Import the custom CSS

const Summary = () => {
  const [netSalary, setNetSalary] = useState(parseInt(localStorage.getItem("salary")) || 0);
  const [partnersSalary, setPartnersSalary] = useState(parseInt(localStorage.getItem("partnersSalary")) || 0);
  const [rentalIncome, setRentalIncome] = useState(parseInt(localStorage.getItem("rentalIncome")) || 0);
  const [agricultureIncome, setAgricultureIncome] = useState(parseInt(localStorage.getItem("agricultureIncome")) || 0);

  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || {});

  const handleIncomeChange = (e, incomeType) => {
    const value = parseInt(e.target.value) || 0;
    switch (incomeType) {
      case "netSalary":
        setNetSalary(value);
        break;
      case "partnersSalary":
        setPartnersSalary(value);
        break;
      case "rentalIncome":
        setRentalIncome(value);
        break;
      case "agricultureIncome":
        setAgricultureIncome(value);
        break;
      default:
        break;
    }
  };

  // Saving incomes to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("salary", netSalary);
    localStorage.setItem("partnersSalary", partnersSalary);
    localStorage.setItem("rentalIncome", rentalIncome);
    localStorage.setItem("agricultureIncome", agricultureIncome);
  }, [netSalary, partnersSalary, rentalIncome, agricultureIncome]);

  const totalExpenses = Object.values(expenses.essential || {}).reduce((a, b) => a + b, 0) + Object.values(expenses.nonEssential || {}).reduce((a, b) => a + b, 0);
  const totalIncome = netSalary + partnersSalary + rentalIncome + agricultureIncome;
  const remainingBalance = totalIncome - totalExpenses;

  return (
    <div className="home-container">
      <Navbar />
    <div className="summary-container">
      <div className="summary-content">
        <h2 className="summary-heading">Income and Expense Calculator</h2>
        
        {/* Income Section */}
        <div className="income-section">
          <div className="input-row">
            <label htmlFor="netSalary">Your Net Salary</label>
            <input
              type="number"
              id="netSalary"
              value={netSalary}
              onChange={(e) => handleIncomeChange(e, "netSalary")}
              className="input-field"
            />
          </div>
          <div className="input-row">
            <label htmlFor="partnersSalary">Partner's Net Salary</label>
            <input
              type="number"
              id="partnersSalary"
              value={partnersSalary}
              onChange={(e) => handleIncomeChange(e, "partnersSalary")}
              className="input-field"
            />
          </div>
          <div className="input-row">
            <label htmlFor="rentalIncome">Other Income – Rental (Post Tax)</label>
            <input
              type="number"
              id="rentalIncome"
              value={rentalIncome}
              onChange={(e) => handleIncomeChange(e, "rentalIncome")}
              className="input-field"
            />
          </div>
          <div className="input-row">
            <label htmlFor="agricultureIncome">Other Income – Agricultural</label>
            <input
              type="number"
              id="agricultureIncome"
              value={agricultureIncome}
              onChange={(e) => handleIncomeChange(e, "agricultureIncome")}
              className="input-field"
            />
          </div>

          {/* Total Income */}
          <div className="total-income">
            <p>Total Income per Month: ₹{totalIncome}</p>
          </div>
        </div>

        {/* Expense Section */}
        <div className="expense-summary">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>

        {/* Remaining Balance */}
        <div className="remaining-balance">
          <h3>Remaining Balance</h3>
          <p>₹{remainingBalance}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Summary; 