import React, { useState } from 'react';

// 🎨 Nuancier complet extrait des captures et spécifications (IDFM & RATP complet)
const PREDEFINED_COLORS = {
  idfm: [
    { hex: "#FF1400" }, { hex: "#E3051C" }, { hex: "#FF5A00" }, { hex: "#F28E42" },
    { hex: "#FFBE00" }, { hex: "#FFCE00" }, { hex: "#DC9600" }, { hex: "#E3B32A" },
    { hex: "#6E491E" }, { hex: "#5A230A" }, { hex: "#8D5E2A" }, { hex: "#6E6E00" },
    { hex: "#9F9825" }, { hex: "#D2D200" }, { hex: "#D5C900" }, { hex: "#00643C" },
    { hex: "#00814F" }, { hex: "#82DC73" }, { hex: "#83C491" }, { hex: "#00A092" },
    { hex: "#00A88F" }, { hex: "#82C8E6" }, { hex: "#98D4E2" }, { hex: "#3C91DC" },
    { hex: "#5291CE" }, { hex: "#0055C8" }, { hex: "#0064B0" }, { hex: "#640082" },
    { hex: "#662483" }, { hex: "#A0006E" }, { hex: "#C04191" }, { hex: "#D282BE" },
    { hex: "#CEADD2" }, { hex: "#FF82B4" }, { hex: "#F3A4BA" }, { hex: "#A50034" },
    { hex: "#B90845" }
  ],
  ratp: [
    { name: "Acacia", hex: "#b6bd00" },
    { name: "Azur", hex: "#003ca6" },
    { name: "Blanc", hex: "#ffffff" },
    { name: "Bleu", hex: "#050d9e" },
    { name: "Bleu opaline", hex: "#659fb3" },
    { name: "Bouton d'or", hex: "#ffcd00" },
    { name: "Brun taupe", hex: "#706760" },
    { name: "Cobalt", hex: "#7ba3dc" },
    { name: "Coquelicot", hex: "#e2231a" },
    { name: "Elysée", hex: "#777779" },
    { name: "Emeraude", hex: "#00945d" },
    { name: "Fuchsia", hex: "#e37ed1" },
    { name: "Iris", hex: "#62259d" },
    { name: "Lilas", hex: "#e19bdf" },
    { name: "Marron", hex: "#704b1c" },
    { name: "Menthe", hex: "#6eca97" },
    { name: "Noir", hex: "#000000" },
    { name: "Ocre", hex: "#c9910d" },
    { name: "Olive", hex: "#837902" },
    { name: "Orange", hex: "#ff7e2e" },
    { name: "Parme", hex: "#cf009e" },
    { name: "Perle", hex: "#cdc3bb" },
    { name: "Pervenche", hex: "#6ec4e8" },
    { name: "Prairie", hex: "#00ae41" },
    { name: "Rose", hex: "#fa9aba" },
    { name: "Sapin", hex: "#007852" },
    { name: "Saumon", hex: "#ff8671" },
    { name: "Vert jade", hex: "#00c4b3" },
    { name: "Vert kaki", hex: "#96935c" }
  ]
};

// 🌍 Dictionnaire de traduction simultanée (5 langues)
const locales = {
  fr: { code: "🇫🇷 FR", mode: "Contributeur", real: "Réel", fake: "Fictif", color: "Couleur", place: "Dépôt" },
  es: { code: "🇪🇸 ES", mode: "Colaborador", real: "Real", fake: "Ficticio", color: "Color", place: "Depósito" },
  de: { code: "🇩🇪 DE", mode: "Mitwirkender", real: "Real", fake: "Fiktiv", color: "Farbe", place: "Depot" },
  gb: { code: "🇬🇧 UK", mode: "Contributor", real: "Real", fake: "Fictional", color: "Colour", place: "Depot" },
  us: { code: "🇺🇸 US", mode: "Contributor", real: "Real", fake: "Fictional", color: "Color", place: "Garage" }
};

export default function App() {
  const [couleurSelectionnee, setCouleurSelectionnee] = useState("#050d9e");
  const [nomReseau, setNomReseau] = useState("");
  const [typeReseau, setTypeReseau] = useState("fake");
  const [reseaux, setReseaux] = useState([
    { id: 1, nom: "Ligne 94 Intra-Muros", type: "fake", couleur: "#e2231a" }
  ]);

  const ajouterReseau = (e) => {
    e.preventDefault();
    if (!nomReseau.trim()) return;

    const nouveau = {
      id: Date.now(),
      nom: nomReseau,
      type: typeReseau,
      couleur: couleurSelectionnee
    };

    setReseaux([nouveau, ...reseaux]);
    setNomReseau("");
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#0e1e2c', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <h2>Global Transit Hub — multi-communities</h2>

      {/* 🛠️ CONFIGURATEUR AVEC COULEURS LOGICIELLES ET OPTION LIBRE */}
      <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0 }}>➕ Créer un réseau personnalisé</h3>
        <form onSubmit={ajouterReseau} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nom de la ligne / du réseau :</label>
            <input 
              type="text" 
              value={nomReseau} 
              onChange={(e) => setNomReseau(e.target.value)}
              placeholder="Ex: Ligne 15 Ouest, Tramway Fictif..." 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', background: '#0e1e2c', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ cursor: 'pointer' }}>
              <input type="radio" name="type" value="fake" checked={typeReseau === "fake"} onChange={() => setTypeReseau("fake")} /> Fictif
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input type="radio" name="type" value="real" checked={typeReseau === "real"} onChange={() => setTypeReseau("real")} /> Réel
            </label>
          </div>

          {/* PALETTES DE COULEURS PRÉDÉFINIES + OPTION SUR MESURE */}
          <div>
            {/* 🎨 SÉLECTEUR DE COULEUR PERSONNALISÉE (LIBRE) */}
            <div style={{ background: '#2c3e50', padding: '12px', borderRadius: '6px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#ffcd00', cursor: 'pointer' }}>
                🎨 Choisir une couleur personnalisée (libre) :
              </label>
              <input 
                type="color" 
                value={couleurSelectionnee} 
                onChange={(e) => setCouleurSelectionnee(e.target.value)}
                style={{ border: 'none', width: '45px', height: '30px', cursor: 'pointer', background: 'none' }}
              />
            </div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#98D4E2' }}>
              Ou sélectionner dans le Nuancier Île-de-France Mobilités (IDFM) :
            </label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', backgroundColor: '#0e1e2c', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
              {PREDEFINED_COLORS.idfm.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setCouleurSelectionnee(col.hex)}
                  style={{
                    width: '26px',
                    height: '26px',
                    backgroundColor: col.hex,
                    border: couleurSelectionnee === col.hex ? '3px solid #fff' : '1px solid #333',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transform: couleurSelectionnee === col.hex ? 'scale(1.15)' : 'scale(1)'
                  }}
                  title={col.hex}
                />
              ))}
            </div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#6ec4e8' }}>
              Ou sélectionner dans le Nuancier Intégral RATP :
            </label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', backgroundColor: '#0e1e2c', padding: '10px', borderRadius: '6px' }}>
              {PREDEFINED_COLORS.ratp.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setCouleurSelectionnee(col.hex)}
                  style={{
                    width: '26px',
                    height: '26px',
                    backgroundColor: col.hex,
                    border: couleurSelectionnee === col.hex ? '3px solid #fff' : '1px solid #333',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transform: couleurSelectionnee === col.hex ? 'scale(1.15)' : 'scale(1)'
                  }}
                  title={`${col.name} (${col.hex})`}
                />
              ))}
            </div>

            <p style={{ fontSize: '13px', marginTop: '12px', color: '#aaa' }}>
              Teinte active : <span style={{ color: couleurSelectionnee, fontWeight: 'bold', backgroundColor: '#0e1e2c', padding: '3px 8px', borderRadius: '4px' }}>{couleurSelectionnee}</span>
            </p>
          </div>

          <button type="submit" style={{ padding: '12px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Enregistrer dans le Hub
          </button>
        </form>
      </div>

      {/* 🌍 RENDU INTERFACE 5 LANGUES SIMULTANÉES */}
      <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0, color: '#ffcd00' }}>🌍 Rendu en direct des 5 langues</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #34495e', color: '#aaa' }}>
              <th style={{ padding: '10px' }}>Langue</th>
              <th>Mode Droits</th>
              <th>Type Réseau</th>
              <th>Lieu Stockage</th>
              <th>Terme Technique</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(locales).map((lang) => (
              <tr key={lang} style={{ borderBottom: '1px solid #2c3e50', height: '35px' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{locales[lang].code}</td>
                <td style={{ color: '#ff7e2e' }}>{locales[lang].mode}</td>
                <td>{locales[lang].fake} / {locales[lang].real}</td>
                <td>{locales[lang].place}</td>
                <td><strong>{locales[lang].color}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📈 COMPOSANT DES RÉSEAUX CRÉÉS */}
      <div>
        <h3>📈 Liste des parcs et réseaux créés</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {reseaux.map(res => (
            <div key={res.id} style={{ background: '#172a3a', padding: '15px', borderRadius: '6px', borderLeft: `6px solid ${res.couleur}`, minWidth: '220px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '3px', backgroundColor: res.type === 'real' ? '#00814F' : '#E3051C', fontWeight: 'bold' }}>
                  {res.type === 'real' ? 'RÉEL' : 'FICTIF'}
                </span>
              </div>
              <h4 style={{ margin: 0 }}>{res.nom}</h4>
              <span style={{ fontSize: '11px', color: '#aaa' }}>Teinte : {res.couleur}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
    }
     
