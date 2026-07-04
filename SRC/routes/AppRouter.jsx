import React from 'react';
import App from '../App';
import { PREDEFINED_COLORS } from '../data/colors';

export default function AppRouter({ currentView, setView }) {
  return (
    <div style={{ background: '#0e1e2c', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Barre de navigation */}
      <nav style={{ background: '#172a3a', padding: '15px 20px', display: 'flex', gap: '15px', borderBottom: '1px solid #2c3e50' }}>
        <button onClick={() => setView('hub')} style={{ background: currentView === 'hub' ? '#2ecc71' : '#34495e', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🎛️ Hub de Configuration</button>
        <button onClick={() => setView('colors')} style={{ background: currentView === 'colors' ? '#6ec4e8' : '#34495e', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🎨 Nuanciers Plein Écran</button>
      </nav>

      {/* Rendu dynamique des vues */}
      {currentView === 'hub' ? <App /> : (
        <div style={{ padding: '20px', color: '#fff' }}>
          <h2 style={{ color: '#6ec4e8' }}>🎨 Nuanciers Graphiques Officiels (Mode Inspection)</h2>
          
          <h3 style={{ color: '#98D4E2' }}>🔹 Palette Île-de-France Mobilités</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {PREDEFINED_COLORS.idfm.map(c => (
              <div key={c.hex} style={{ background: '#172a3a', padding: '10px', borderRadius: '6px', textAlign: 'center', width: '90px' }}>
                <div style={{ backgroundColor: c.hex, height: '50px', borderRadius: '4px', marginBottom: '8px' }} />
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{c.hex}</span>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#fa9aba' }}>🔹 Palette Régie Autonome (RATP)</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {PREDEFINED_COLORS.ratp.map(c => (
              <div key={c.hex} style={{ background: '#172a3a', padding: '10px', borderRadius: '6px', textAlign: 'center', width: '100px' }}>
                <div style={{ backgroundColor: c.hex, height: '50px', borderRadius: '4px', marginBottom: '8px' }} />
                <span style={{ fontSize: '11px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.name}</span>
                <span style={{ fontSize: '11px', color: '#aaa' }}>{c.hex}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
                }
                              
