import React, { useState } from 'react';
import App from '../App';
import { PREDEFINED_COLORS } from '../data/colors';

export default function AppRouter({ currentView, setView }) {
  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState("all"); // "all", "idfm", "ratp"

  const filtrerRatp = PREDEFINED_COLORS.ratp.filter(c => 
    c.name.toLowerCase().includes(recherche.toLowerCase()) || 
    c.hex.toLowerCase().includes(recherche.toLowerCase())
  );

  const filtrerIdfm = PREDEFINED_COLORS.idfm.filter(c => 
    c.hex.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div style={{ background: '#0e1e2c', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#172a3a', padding: '15px 20px', display: 'flex', gap: '15px', borderBottom: '1px solid #2c3e50' }}>
        <button onClick={() => setView('hub')} style={{ background: currentView === 'hub' ? '#2ecc71' : '#34495e', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🎛️ Hub de Configuration</button>
        <button onClick={() => setView('colors')} style={{ background: currentView === 'colors' ? '#6ec4e8' : '#34495e', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🎨 Nuanciers Plein Écran</button>
      </nav>

      {currentView === 'hub' ? <App /> : (
        <div style={{ padding: '20px', color: '#fff' }}>
          <h2 style={{ color: '#6ec4e8', marginBottom: '15px' }}>🎨 Nuanciers Graphiques Officiels (Moteur de Recherche)</h2>
          
          {/* Barre de recherche de la Couche 4 */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Rechercher une couleur (Ex: Jade, #ff...)" 
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: 'none', background: '#1c2e3d', color: '#fff', width: '280px' }}
            />
            <button onClick={() => setFiltreType("all")} style={{ padding: '10px 15px', background: filtreType === "all" ? '#ffcd00' : '#34495e', color: filtreType === "all" ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Tout</button>
            <button onClick={() => setFiltreType("idfm")} style={{ padding: '10px 15px', background: filtreType === "idfm" ? '#98D4E2' : '#34495e', color: filtreType === "idfm" ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>IDFM uniquement</button>
            <button onClick={() => setFiltreType("ratp")} style={{ padding: '10px 15px', background: filtreType === "ratp" ? '#fa9aba' : '#34495e', color: filtreType === "ratp" ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>RATP uniquement</button>
          </div>

          {(filtreType === "all" || filtreType === "idfm") && (
            <>
              <h3 style={{ color: '#98D4E2' }}>🔹 Palette Île-de-France Mobilités ({filtrerIdfm.length})</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {filtrerIdfm.map(c => (
                  <div key={c.hex} style={{ background: '#172a3a', padding: '10px', borderRadius: '6px', textAlign: 'center', width: '90px' }}>
                    <div style={{ backgroundColor: c.hex, height: '50px', borderRadius: '4px', marginBottom: '8px' }} />
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {(filtreType === "all" || filtreType === "ratp") && (
            <>
              <h3 style={{ color: '#fa9aba' }}>🔹 Palette Régie Autonome ({filtrerRatp.length})</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {filtrerRatp.map(c => (
                  <div key={c.hex} style={{ background: '#172a3a', padding: '10px', borderRadius: '6px', textAlign: 'center', width: '100px' }}>
                    <div style={{ backgroundColor: c.hex, height: '50px', borderRadius: '4px', marginBottom: '8px' }} />
                    <span style={{ fontSize: '11px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
