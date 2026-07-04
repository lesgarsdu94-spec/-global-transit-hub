import React, { createContext, useState, useContext } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [logs, setLogs] = useState([
    { id: 1, action: "Initialisation du Hub", date: new Date().toLocaleTimeString() }
  ]);

  const addLog = (message) => {
    const newLog = {
      id: Date.now(),
      action: message,
      date: new Date().toLocaleTimeString()
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  return (
    <HistoryContext.Provider value={{ logs, addLog }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => useContext(HistoryContext);
