import React from "react";

/**
 * Error message box
 * @param {{message: string}} props
 */
export default function ErrorMessage({ message }) {
  return (
    <div className="error" role="alert">
      <strong>Error:</strong> {message}
    </div>
  );
}
