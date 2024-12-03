import React from "react";

// Define priority labels and colors
const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
const priorityColors = ["#ccc", "green", "yellow", "orange", "red"];

const Card = ({ ticket, statusImage, priorityImage }) => {
  return (
    <div
      className="card"
      style={{ borderLeft: `4px solid ${priorityColors[ticket.priority]}` }} // Add color coding
    >
      <div className="card-header">
        <h4>{ticket.title}</h4>
        <div className="icons">
          {/* Display status image */}
          <img src={statusImage} alt={ticket.status} width="20" height="20" />
          {/* Display priority image */}
          <img src={priorityImage} alt="Priority" width="20" height="20" />
        </div>
      </div>
      <p>{ticket.description}</p>
      <small>Priority: {priorityLabels[ticket.priority]}</small> {/* Add priority label */}
    </div>
  );
};

export default Card;
