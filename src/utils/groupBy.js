// src/utils/groupBy.js
export const groupBy = (tickets, key) => {
    return tickets.reduce((result, ticket) => {
      const groupKey = ticket[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(ticket);
      return result;
    }, {});
  };
  