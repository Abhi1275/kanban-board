import React, { useState, useEffect } from "react";
import { fetchTickets } from "../api";
import { groupBy } from "../utils/groupBy";
import { sortTickets } from "../utils/sortTickets";
import Card from "./Card";
import Controls from "./Controls";

// Import images for different statuses and priorities
import ToDoIcon from '../assets/images/To-do.svg';
import UrgentPriority from '../assets/images/SVG - Urgent Priority colour.svg';
import NoPriority from '../assets/images/No-priority.svg';
import InProgress from '../assets/images/in-progress.svg';
import MediumPriority from '../assets/images/Img - Medium Priority.svg';
import LowPriority from '../assets/images/Img - Low Priority.svg';
import HighPriority from '../assets/images/Img - High Priority.svg';
import Done from '../assets/images/Done.svg';
import Backlog from '../assets/images/Backlog.svg';

// Additional imports for top bar icons
import threeDotMenu from "../assets/images/3 dot menu.svg";
import cancelled from "../assets/images/Cancelled.svg";
import doneIcon from "../assets/images/Done.svg";
import todoIcon from "../assets/images/To-do.svg";
import inProgressIcon from "../assets/images/in-progress.svg";
import addIcon from "../assets/images/add.svg";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupKey, setGroupKey] = useState("status");
  const [sortKey, setSortKey] = useState("priority");

  // Load the saved view state from localStorage on component mount
  useEffect(() => {
    const savedGroupKey = localStorage.getItem("groupKey") || "status";
    const savedSortKey = localStorage.getItem("sortKey") || "priority";
    setGroupKey(savedGroupKey);
    setSortKey(savedSortKey);
  }, []);

  // Save the view state to localStorage whenever groupKey or sortKey changes
  useEffect(() => {
    localStorage.setItem("groupKey", groupKey);
    localStorage.setItem("sortKey", sortKey);
  }, [groupKey, sortKey]);

  // Fetch tickets from API
  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data);
    };
    getTickets();
  }, []);

  // Group tickets based on the current groupKey
  const groupedTickets = groupBy(tickets, groupKey);

  // Function to determine which image to use based on priority or status
  const getStatusImage = (status) => {
    switch (status) {
      case 'To Do':
        return ToDoIcon;
      case 'In Progress':
        return InProgress;
      case 'Done':
        return Done;
      case 'Backlog':
        return Backlog;
      default:
        return ToDoIcon;
    }
  };

  const getPriorityImage = (priority) => {
    switch (priority) {
      case 4:
        return HighPriority;
      case 3:
        return MediumPriority;
      case 2:
        return LowPriority;
      default:
        return NoPriority;
    }
  };

  return (
    <div>
      {/* Header Section with Icons */}
      <header className="top-bar">
        <img src={threeDotMenu} alt="Menu" width="30" height="30" />
        <img src={cancelled} alt="Cancelled" width="30" height="30" />
        <img src={doneIcon} alt="Done" width="30" height="30" />
        <img src={todoIcon} alt="To Do" width="30" height="30" />
        <img src={inProgressIcon} alt="In Progress" width="30" height="30" />
        <img src={addIcon} alt="Add" width="30" height="30" />
      </header>

      <Controls onGroupChange={setGroupKey} onSortChange={setSortKey} />

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="column">
            <h3>{group}</h3>
            {sortTickets(groupedTickets[group], sortKey).map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                statusImage={getStatusImage(ticket.status)} // Pass status image
                priorityImage={getPriorityImage(ticket.priority)} // Pass priority image
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
