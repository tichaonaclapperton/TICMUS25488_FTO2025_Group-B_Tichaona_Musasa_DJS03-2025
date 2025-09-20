// src/components/SearchBar.jsx
import React from "react";


/**
 * SearchBar component for filtering items by text input
 * @param {Object} props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Callback when input changes
 */
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search by title or genre..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}


