import React from "react";
//import PropTypes from "prop-types";

const Button = ({ children, variant = "primary", onClick, ariaLabel, disabled = false }) => {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      aria-label={ariaLabel || children}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;