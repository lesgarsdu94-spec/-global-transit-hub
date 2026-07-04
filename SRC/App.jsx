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
        <label style={{ padding: '8px 12px', background: '#34495e
    
