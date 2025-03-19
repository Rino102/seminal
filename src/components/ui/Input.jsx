import React, { useState } from "react";

const Input = ({ label, placeholder, type = "text", disabled }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hint, setHint] = useState("Hint");
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle input change with validation
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Validation logic based on input type
    if (type === "number" && isNaN(newValue)) {
      setError("Must be a number");
    } else if (type === "text" && newValue.length < 3) {
      setError("Minimum 3 characters required");
    } else {
      setError("");
    }
  };

  // Handle blur event (losing focus)
  const handleBlur = () => {
    setIsFocused(false);
    setIsCompleted(!error && value.trim().length > 0);
  };

  return (
    <div className={`input-container ${disabled ? "disabled" : ""} ${error ? "error" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div className="input-wrapper">
        <input
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          disabled={disabled}
        />

        
        {value && !disabled && (
          <button className="clear-btn" onClick={() => setValue("")}>✖</button>
        )}

        
        {isCompleted && <span className="success-message">Available </span>}
      </div>

      
      
      {error ? <p className="error-message">⚠ {error}</p> : <p className="message">{hint}</p>}
    </div>
  );
};

export default Input;