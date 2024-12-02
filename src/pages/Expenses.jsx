import React, { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/expenses.css";

const Expenses = () => {
  const initialExpenses = {
    essential: {
      grocery: 0,
      basic_amenities: 0,
      domestic_helps: 0,
      bills: 0,
      emi: 0,
      tuition_fees: 0,
      insurance_premiums: 0,
      others: 0,
    },
    nonEssential: {
      new_phone: 0,
      eating_out: 0,
      movie: 0,
      shopping: 0,
      saloon_services: 0,
      credit_card_interest: 0,
      holiday: 0,
      others: 0,
    },
  };

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || initialExpenses
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e, category, field) => {
    setExpenses({
      ...expenses,
      [category]: {
        ...expenses[category],
        [field]: parseFloat(e.target.value) || 0,
      },
    });
  };

  const handleSave = () => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    setSuccessMessage("Expenses saved successfully!");

    // Hide the success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const calculateTotal = (category) =>
    Object.values(expenses[category]).reduce((total, value) => total + value, 0);

  const clearCategory = (category) => {
    setExpenses({
      ...expenses,
      [category]: Object.keys(expenses[category]).reduce(
        (acc, field) => ({ ...acc, [field]: 0 }),
        {}
      ),
    });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="expenses-container">
        <h2 className="expenses-title">Expense Sheet</h2>

        {/* Expenses Grid */}
        <div className="expenses-grid">
          {/* Essential Expenses Section */}
          <div className="expenses-section">
            <h3>Your Essential Expenses</h3>
            {Object.entries(expenses.essential).map(([field, value]) => (
              <div key={field} className="expenses-field">
                <label htmlFor={field} className="expenses-label">
                  {field === "grocery"
                    ? "Grocery"
                    : field === "basic_amenities"
                    ? "Basic Amenities (Electricity, Water, Gas)"
                    : field === "domestic_helps"
                    ? "Domestic Helps"
                    : field === "bills"
                    ? "Bills – Mobile, WIFI, Netflix, Amazon etc."
                    : field === "emi"
                    ? "EMI – Home Loan, Car Loan, Two-Wheeler Loan"
                    : field === "tuition_fees"
                    ? "Tuition Fees (School, Extra Activities etc.)"
                    : field === "insurance_premiums"
                    ? "Insurance Premiums (Life, Health and General Insurance)"
                    : "Others, if any"}
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  value={value}
                  onChange={(e) => handleChange(e, "essential", field)}
                  className="expenses-input no-spinner"
                />
              </div>
            ))}
            <div className="expenses-total">
              Total Essential Expenses Per Month: ₹{calculateTotal("essential")}
            </div>
            <button
              onClick={() => clearCategory("essential")}
              className="clear-button"
            >
              Clear Essential Expenses
            </button>
          </div>

          {/* Non-Essential Expenses Section */}
          <div className="expenses-section">
            <h3>Your Non-Essential Expenses</h3>
            {Object.entries(expenses.nonEssential).map(([field, value]) => (
              <div key={field} className="expenses-field">
                <label htmlFor={field} className="expenses-label">
                  {field === "new_phone"
                    ? "If You Are Buying a New Phone Every Year (Put Only the Monthly Cost)"
                    : field === "eating_out"
                    ? "Eating Out"
                    : field === "movie"
                    ? "Movie"
                    : field === "shopping"
                    ? "Shopping (Online & Offline)"
                    : field === "saloon_services"
                    ? "Saloon Services"
                    : field === "credit_card_interest"
                    ? "Credit Card Interest, if Any"
                    : field === "holiday"
                    ? "Holiday"
                    : "Others, if any"}
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  value={value}
                  onChange={(e) => handleChange(e, "nonEssential", field)}
                  className="expenses-input no-spinner"
                />
              </div>
            ))}
            <div className="expenses-total">
              Total Non-Essential Expenses Per Month: ₹
              {calculateTotal("nonEssential")}
            </div>
            <button
              onClick={() => clearCategory("nonEssential")}
              className="clear-button"
            >
              Clear Non-Essential Expenses
            </button>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="expenses-summary">
          <h3>
            Total Expenses: ₹
            {calculateTotal("essential") + calculateTotal("nonEssential")}
          </h3>
          <button onClick={handleSave} className="expenses-button">
            Save Expenses
          </button>
        {/* Success Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
        </div>
    </div>
  );
};

export default Expenses;
