import React from 'react';
// Ha a videó az 'src/assets' mappában van:
import waterVideo from '../assets/flow_water_promo.mp4'; 
import { FileX } from 'lucide-react';

const Video_default = () => {
  return (
    <div className="video-container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      
    }}>
      <video 
        src={waterVideo} 
        autoPlay       // Automatikus indítás
        loop           // Végtelenítés
        muted          // KÖTELEZŐ! Hang nélkül indul csak el magától
        playsInline    // Fontos iOS-re (hogy ne ugorjon teljes képernyőre)
        style={{
             maxWidth: '100%',
             height: '40vw',
             objectFit: 'cover', // Ezzel tölti ki a teret torzítás nélkül
             borderRadius: "50% 20% / 10% 40%"
        }}
      />
    </div>
  );
};
export default Video_default;