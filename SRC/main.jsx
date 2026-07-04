import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import { HistoryProvider } from './context/HistoryContext';

function Root() {
  // Gestion de la vue active pour le routage de ton site
  const [currentView, setView] = useState('hub');

  return (
    <React.StrictMode>
      <HistoryProvider>
        <AppRouter currentView={currentView} setView={setView} />
      </HistoryProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
