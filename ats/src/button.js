import React from "react";

export const Button = ({ children, ...buttonProps }) => (
  <button {...buttonProps}>{children}</button>
);
