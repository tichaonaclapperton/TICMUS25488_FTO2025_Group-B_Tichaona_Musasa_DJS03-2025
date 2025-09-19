import React from "react";

/**
 * Simple loading indicator
 * @param {{message?: string}} props
 */
export default function Loading({ message = "Loading..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden></div>
      <div className="loadingText">{message}</div>
    </div>
  );
}
