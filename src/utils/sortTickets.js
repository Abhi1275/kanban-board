// src/utils/sortTickets.js
export const sortTickets = (tickets, sortBy) => {
    if (sortBy === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };
  