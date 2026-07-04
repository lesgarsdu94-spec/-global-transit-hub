import React, { useState } from 'react';

export default function ApercuImage({ borderTeinte }) {
  const [imageApercu, setImageApercu] = useState(null);

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageApercu(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ background: '#1c2e3d', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
      <h3 style={{ marginTop: 0 }}>📷 Importer un document / visuel (Appareil ou Galerie)</h3>
      <input type="file" accept="image/*" onChange={handleMedia} style={{ color: '#fff' }} />
      {imageApercu && (
        <div style={{ marginTop: '15px' }}>
          <img 
            src={imageApercu} 
            alt="Aperçu du média" 
            style={{ maxWidth: '145px', borderRadius: '6px', border: `2px solid ${borderTeinte}` }} 
          />
        </div>
      )}
    </div>
  );
}
