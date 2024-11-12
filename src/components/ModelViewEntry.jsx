import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import Curtain from './Curtain';
import { Canvas } from "@react-three/fiber";
import Model from './Model'; // Importiere das Model

const ModelViewEntry = ({ onAnimationComplete }) => {
  // Refs für die Vorhänge
  const curtainRefLeft = useRef();
  const curtainRefRight = useRef();
  const [showModel, setShowModel] = useState(false); // Zustand für das Modell
  const [showCanvas, setShowCanvas] = useState(true); // Zustand für das Canvas und den Button

  const handleButtonClick = () => {
    // Animation der Vorhänge
    gsap.to(curtainRefLeft.current.position, {
      x: -60, // Linker Vorhang
      duration: 2,
      ease: "power2.inOut"
    });

    gsap.to(curtainRefRight.current.position, {
      x: 60, // Rechter Vorhang
      duration: 2,
      ease: "power2.inOut"
    });

    // Nach der Animation: Steuerung der Anzeige des Modells
    gsap.to('.curtain-button', {
      opacity: 0,
      duration: 0.5,
      pointerEvents: 'none',
      delay: 1.2,
      onComplete: () => {
        setShowCanvas(false); // Verstecke das Canvas und den Button
        setShowModel(true); // Zeige das Modell an
        onAnimationComplete(); // Callback zur Steuerung des Szenenwechsels
      }
    });
  };

  return (
    <>
      {/* Canvas und Button verstecken, wenn showCanvas auf false gesetzt ist */}
      {showCanvas && (
        <div className="curtain-wrapper">
          <button
            className="curtain-button"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              zIndex: 10,
            }}
            onClick={handleButtonClick}
          >
            Vorhänge öffnen
          </button>
        </div>
      )}

      {/* Canvas mit Vorhängen, der auch ausgeblendet wird */}
      {showCanvas && (
        <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Curtain ref={curtainRefLeft} position={[-5, 0, 0]} color="red" />
          <Curtain ref={curtainRefRight} position={[5, 0, 0]} color="blue" />
        </Canvas>
      )}

      {/* Das Model wird erst nach der Animation geladen */}
      {showModel && <Model />} 
    </>
  );
};

export default ModelViewEntry;
