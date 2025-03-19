import React from "react";
//import PropTypes from "prop-types";

const Button = ({ children, variant = "primary", onClick, ariaLabel }) => {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      aria-label={ariaLabel || children}
    >
      {children}
    </button>
  );
};

export default Button;