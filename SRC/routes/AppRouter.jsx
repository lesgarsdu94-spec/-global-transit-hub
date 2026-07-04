import React from 'react';
import App from '../App';

// Structure de navigation simple pour ta transition de pages
export default function AppRouter({ currentView, setView }) {
  return (
    <div style={{ background: '#0e1e2c', minHeight: '100vh' }}>
      {/* Barre de navigation simplifiée */}
      <nav style={{ background: '#172a3a', padding: '10px 20px', display: 'flex', gap: '15px' }}>
        <button onClick={() => setView('hub')} style={{ background: currentView === 'hub' ? '#2ecc71' : 'none', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>🎛️ Hub Principal</button>
        <button onClick={() => setView('colors')} style={{ background: currentView === 'colors' ? '#6ec4e8' : 'none', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>🎨 Nuanciers Plein Écran</button>
      </nav>

      {/* Rendu conditionnel des fichiers */}
      {currentView === 'hub' ? <App /> : (
        <div style={{ padding: '20px', color: '#fff' }}>
          <h3>🎨 Module Nuanciers en construction</h3>
          <p>Cette section isolera les nuanciers IDFM et RATP pour les infographistes de la communauté.</p>
        </div>
      )}
    </div>
  );
}
