import React, { useState, useEffect } from 'react';
import { PREDEFINED_COLORS } from './data/colors';
import { locales } from './data/translations';
import { useHistory } from './context/HistoryContext';
import ApercuImage from './components/ApercuImage';

export default function App() {
  const { logs, addLog } = useHistory();
  const [couleurSelectionnee, setCouleurSelectionnee] = useState("#050d9e");
  const [nomReseau, setNomReseau] = useState("");
  const [typeReseau, setTypeReseau] = useState("fake");

  const [reseaux, setReseaux] = useState(() => {
    const saved = localStorage.getItem('transit_hub_networks');
    return saved ? JSON.parse(saved) : [
      { id: 1, nom: "Ligne Inter-Communautés 94", type: "fake", couleur: "#050d9e" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('transit_hub_networks', JSON.stringify(reseaux));
  }, [reseaux]);

  // 📊 CALCULS STATISTIQUES (COUCHE 5)
  const totalReseaux = reseaux.length;
  const totalReels = reseaux.filter(r => r.type === "real").length;
  const totalFictifs = reseaux.filter(r => r.type === "fake").length;
  const pourcentReels = totalReseaux > 0 ? Math.round((totalReels / totalReseaux) * 100) : 0;

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
    addLog(`Création du réseau [${nomReseau}] (${couleurSelectionnee})`);
    setNomReseau("");
  };

  // 🛡️ SUPPRESSION SÉCURISÉE (COUCHE 5)
  const supprimerReseau = (id, nom) => {
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer définitivement le réseau "${nom}" ?`);
    if (confirmation) {
      setReseaux(reseaux.filter(r => r.id !== id));
      addLog(`Suppression sécurisée du réseau [${nom}]`);
    }
  };

  const exporterDonnees = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reseaux, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hub_transit_94_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog("Exportation du fichier JSON des réseaux réussie");
  };

  const importerDonnees = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            setReseaux([...parsed, ...reseaux]);
            addLog("Importation et fusion des réseaux JSON réussies");
          }
        } catch (error) {
          addLog("Échec de l'importation : Format JSON invalide");
        }
      };
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      
      {/* 📊 BARRE DE STATISTIQUES GLOBALES (COUCHE 5) */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '150px', background: '#1c2e3d', padding: '15px', borderRadius: '6px', textAlign: 'center', borderBottom: '4px solid #ffcd00' }}>
          <span style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>TOTAL RÉSEAUX</span>
          <strong style={{ fontSize: '22px' }}>{totalReseaux}</strong>
        </div>
        <div style={{ flex: '1', minWidth: '150px', background: '#1c2e3d', padding: '15px', borderRadius: '6px', textAlign: 'center', borderBottom: '4px solid #00814F' }}>
          <span style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>RÉSEAUX RÉELS</span>
          <strong style={{ fontSize: '22px', color: '#82DC73' }}>{totalReels} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>({pourcentReels}%)</span></strong>
        </div>
        <div style={{ flex: '1', minWidth: '150px', background: '#1c2e3d', padding: '15px', borderRadius: '6px', textAlign: 'center', borderBottom: '4px solid #E3051C' }}>
          <span style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>RESEAUX FICTIFS</span>
          <strong style={{ fontSize: '22px', color: '#F3A4BA' }}>{totalFictifs}</strong>
        </div>
      </div>

      {/* BOUTONS D'IMPORT / EXPORT */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={exporterDonnees} style={{ padding: '8px 12px', background: '#34495e', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>📥 Exporter Sauvegarde JSON</button>
        <label style={{ padding: '8px 12px', background: '#34495e', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
          📤 Importer Fichier JSON
          <input type="file" accept=".json" onChange={importerDonnees} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0 }}>➕ Configurer un réseau (Sauvegarde locale automatique)</h3>
        <form onSubmit={ajouterReseau} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" value={nomReseau} onChange={(e) => setNomReseau(e.target.value)} placeholder="Nom de la ligne / du réseau..." style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', background: '#0e1e2c', color: '#fff' }} />
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ cursor: 'pointer' }}><input type="radio" name="type" value="fake" checked={typeReseau === "fake"} onChange={() => setTypeReseau("fake")} /> Fictif</label>
            <label style={{ cursor: 'pointer' }}><input type="radio" name="type" value="real" checked={typeReseau === "real"} onChange={() => setTypeReseau("real")} /> Réel</label>
          </div>
          <div>
            <div style={{ background: '#2c3e50', padding: '12px', borderRadius: '6px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#ffcd00' }}>🎨 Palette libre :</label>
              <input type="color" value={couleurSelectionnee} onChange={(e) => setCouleurSelectionnee(e.target.value)} style={{ border: 'none', width: '45px', height: '30px', cursor: 'pointer', background: 'none' }} />
            </div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#98D4E2' }}>Nuancier IDFM :</label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', backgroundColor: '#0e1e2c', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
              {PREDEFINED_COLORS.idfm.map((col) => (
                <button key={col.hex} type="button" onClick={() => setCouleurSelectionnee(col.hex)} style={{ width: '24px', height: '24px', backgroundColor: col.hex, border: couleurSelectionnee === col.hex ? '3px solid #fff' : '1px solid #333', borderRadius: '4px', cursor: 'pointer' }} />
              ))}
            </div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#6ec4e8' }}>Nuancier RATP complet :</label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', backgroundColor: '#0e1e2c', padding: '10px', borderRadius: '6px' }}>
              {PREDEFINED_COLORS.ratp.map((col) => (
                <button key={col.hex} type="button" onClick={() => setCouleurSelectionnee(col.hex)} style={{ width: '24px', height: '24px', backgroundColor: col.hex, border: couleurSelectionnee === col.hex ? '3px solid #fff' : '1px solid #333', borderRadius: '50%', cursor: 'pointer' }} title={col.name} />
              ))}
            </div>
          </div>
          <button type="submit" style={{ padding: '12px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Enregistrer la configuration</button>
        </form>
      </div>

      <ApercuImage borderTeinte={couleurSelectionnee} />

      <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0, color: '#ff7e2e' }}>📜 Journal des modifications du Hub</h3>
        <div style={{ maxHeight: '120px', overflowY: 'auto', background: '#0e1e2c', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px' }}>
          {logs.map(log => (
            <div key={log.id} style={{ marginBottom: '6px', color: '#bbb' }}>
              <span style={{ color: '#888' }}>[{log.date}]</span> {log.action}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0, color: '#ffcd00' }}>🌍 Traduction Simultanée (5 langues)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #34495e', color: '#aaa' }}>
              <th style={{ padding: '6px' }}>Langue</th>
              <th>Mode</th>
              <th>Type</th>
              <th>Stockage</th>
              <th>Terme</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(locales).map((lang) => (
              <tr key={lang} style={{ borderBottom: '1px solid #2c3e50', height: '32px' }}>
                <td style={{ padding: '6px', fontWeight: 'bold' }}>{locales[lang].code}</td>
                <td style={{ color: '#ff7e2e' }}>{locales[lang].mode}</td>
                <td>{locales[lang].fake} / {locales[lang].real}</td>
                <td>{locales[lang].place}</td>
                <td><strong>{locales[lang].color}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>📈 Liste des parcs créés</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {reseaux.map(res => (
            <div key={res.id} style={{ background: '#172a3a', padding: '15px', borderRadius: '6px', borderLeft: `6px solid ${res.couleur}`, minWidth: '220px', position: 'relative' }}>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '3px', backgroundColor: res.type === 'real' ? '#00814F' : '#E3051C', fontWeight: 'bold' }}>{res.type === 'real' ? 'RÉEL' : 'FICTIF'}</span>
              <button onClick={() => supprimerReseau(res.id, res.nom)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>🗑️</button>
              <h4 style={{ margin: '8px 0 0 0' }}>{res.nom}</h4>
              <span style={{ fontSize: '11px', color: '#888' }}>{res.couleur}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
