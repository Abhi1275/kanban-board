// src/components/Controls.js
import React, { useState } from "react";

const Controls = ({ onGroupChange, onSortChange }) => {
  const [selectedGroupKey, setSelectedGroupKey] = useState("status");
  const [selectedSortKey, setSelectedSortKey] = useState("priority");

  return (
    <div className="controls">
      <label>
        Group By:
        <select
          value={selectedGroupKey}
          onChange={(e) => setSelectedGroupKey(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Sort By:
        <select
          value={selectedSortKey}
          onChange={(e) => setSelectedSortKey(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
      <button
        onClick={() => {
          onGroupChange(selectedGroupKey);
          onSortChange(selectedSortKey);
        }}
      >
        Display
      </button>
    </div>
  );
};

export default Controls;
