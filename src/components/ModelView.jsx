import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import React, { Suspense, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Shell from './Shell';
import WaterSurface from './WaterSurface';
import Ring from './Ring';

const ModelView = () => {
  const [buttonText, setButtonText] = useState("Start your animation");
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const shell1Ref = useRef();
  const shell2Ref = useRef();
  const shell3Ref = useRef();
  const shell4Ref = useRef();
  const shell5Ref = useRef();
  const shell6Ref = useRef();
  const shellsGroupRef = useRef();

  //Ring Referenz
  const ringRef = useRef();


    // Kamera-Referenz
    // const { camera } = useThree();


  // GSAP Animation für kontinuierliche Drehung der Muscheln
  const handleButtonClick = () => {
    console.log("Button klick funktioniert");

    if (!isAnimationStarted) {
      // Stoppt alle Animationen der Muschel-Gruppe, einschließlich der Rotation
      gsap.killTweensOf(shellsGroupRef.current.rotation);

      // Setzt die Rotation sofort auf die gewünschte Ausgangsposition (0, 0, 0)
      gsap.to(shellsGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: 0 });

      // Position verändern von Muscheln 4-6
      gsap.to([shell4Ref.current.position, shell5Ref.current.position, shell6Ref.current.position], {
        y: "-=20",
        duration: 8,
        ease: "power2.out",
      });

      // damit die Muscheln nach hinten und runter gehen
      gsap.to([shell1Ref.current.position], {
        z: "-=15",
        y: '-=4',
        duration: 8,
        ease: "power2.out",
      });

      gsap.to([shell2Ref.current.position], {
        z: "-=10",
        x: '-=10',
        y: '-=5',
        duration: 10,
        ease: "power2.out",
      });

      gsap.to([shell3Ref.current.position], {
        z: "-=10",
        x: '+=10',
        y: '-=5', 
        duration: 8,
        ease: "power2.out",
      });

      // Rotation auf feste Werte setzen, damit die Muscheln von vorne angezeigt werden
      gsap.to([shell1Ref.current.rotation], {
        x: Math.PI / 2, 
        y: Math.PI,
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([shell2Ref.current.rotation], {
        x: Math.PI / 2, 
        y: Math.PI,
        z: Math.PI,
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([shell3Ref.current.rotation], {
        x: Math.PI / 2, 
        y: Math.PI,
        z: Math.PI,
        duration: 8,
        ease: 'power2.out', 
      });

      //damit der Ring nach oben kommt und sich dreht
      gsap.to([ringRef.current.position], {
        y: 10,
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([ringRef.current.rotation], {
        y: "+=6.28", // Drehung am Platz
        duration: 30,
        repeat: -1,
        ease: "linear"
      
      });

      setTimeout(() => {
        setButtonText("Yes, I want it");
    }, 5000); // Text wird nach 3 Sekunden geändert

      setIsAnimationStarted(true); // Animation wurde gestartet
    } else {
      // Wenn Animation gestartet ist, dann bewege den Ring nach oben
      handleMoveRingUp();
    }
  };

  const handleMoveRingUp = () => {
    console.log("Ring nach oben Button gedrückt");

    // Startet die Bewegung des Rings nach oben
    gsap.to(ringRef.current.position, {
      y: 30, // Ring nach oben bewegen
      duration: 8,
      ease: 'power2.out',
    });

    // Kamera nach oben bewegen
    // gsap.to(camera.position, {
    //     x: -4.6, // Kamera ebenfalls nach oben bewegen
    //     y: 2.1,
    //     z:11.8,
    //     duration: 8,
    //     ease: 'power2.out',
    //   });

    // Button-Text aktualisieren, um anzuzeigen, dass der Ring jetzt oben ist
    setButtonText("Ring ist oben");
  };

  return (
    <>
      <Canvas camera={{ position: [0, 10, 40], fov: 50 }}>

        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <ambientLight intensity={1}  />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="dawn" background />
      <OrbitControls />
    
        <Suspense fallback={null}>
          <group ref={shellsGroupRef}>
            <Ring ref={ringRef} />
            <Shell
              refShell1={shell1Ref}
              refShell2={shell2Ref}
              refShell3={shell3Ref}
              refShell4={shell4Ref}
              refShell5={shell5Ref}
              refShell6={shell6Ref}
              shellsGroupRef={shellsGroupRef}
            />
          </group>
          <WaterSurface />
        </Suspense>
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleButtonClick} // handleButtonClick sorgt für die Steuerung der beiden Schritte
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default ModelView;
