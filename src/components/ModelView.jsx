import { Canvas } from "@react-three/fiber";
import {Sparkles, Cloud, Sky, Environment } from "@react-three/drei";
import React, { Suspense, useRef, useState } from 'react';
import { useThree } from "@react-three/fiber";
import { gsap } from 'gsap';
// import Shell from './Shell';
import OtherShell from "./otherShell";
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
  const ringRef = useRef();
  const cameraRef = useRef(); // Neue Referenz für die Kamera

  // Kamera-Referenz setzen
  const CameraControls = () => {
    const { camera } = useThree();
    cameraRef.current = camera; // Kamera in cameraRef speichern
    return null;
  };

  const handleButtonClick = () => {
    console.log("Button klick funktioniert");


    if (!isAnimationStarted) {
      gsap.killTweensOf(shellsGroupRef.current.rotation);
      gsap.to(shellsGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: 0  });

      gsap.to([shell4Ref.current.position, shell5Ref.current.position, shell6Ref.current.position], {
        y: "-=20",
        duration: 8,
        ease: 'back.out(1.7)' ,
      });

      gsap.to([shell1Ref.current.position], {
        z: -3,
        x: 0,
        y: 0,
        duration: 8,
        ease: 'back.out(1.7)' ,
      });

      gsap.to([shell2Ref.current.position], {
        z: -4,
        x: -4,
        y: -0.6,
        duration: 10,
        ease: 'back.out(1.7)' ,
      });

      gsap.to([shell3Ref.current.position], {
        z: -4,
        x: 3,
        y: -0.6, 
        duration: 8,
        ease: 'back.out(1.7)' ,
      });

      gsap.to([shell1Ref.current.rotation], {
       
       y: -Math.PI / 3,
        
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([shell2Ref.current.rotation], {
       
        y: -Math.PI ,
       
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([shell3Ref.current.rotation], {
        y: Math.PI / 4,
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([ringRef.current.position], {
        y: 10,
        z: 0,
        duration: 8,
        ease: 'power2.out', 
      });

      gsap.to([ringRef.current.rotation], {
        y: "+=6.28",
        duration: 30,
        repeat: -1,
        ease: "linear"
      });

      setTimeout(() => {
        setButtonText("Yes, I want it");
      }, 5000);

      setIsAnimationStarted(true);
    } else {
      handleMoveRingUp();
    }
  };

  const handleMoveRingUp = () => {
    console.log("Ring nach oben Button gedrückt");

    gsap.to(ringRef.current.position, {
      y: 48,
      duration: 8,
      ease: 'power2.out',
    });

    // Zugriff auf cameraRef.current für die Animation
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
      
        z: 18,
        y: 50,
       duration: 8,
        ease: 'power2.out',
      });
    }

    setButtonText("Ring ist oben");



  };

  return (
    <>
      <Canvas camera={{ position: [0, 10, 40], fov: 40 }} >
      
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <ambientLight intensity={1} color="#180527FF"  />
        <directionalLight position={[5, 5, 5]} />
     
        <Environment preset="warehouse" background />
        {/* <OrbitControls /> */}
        <CameraControls /> {/* Kamera innerhalb von Canvas */}
    
        <Suspense fallback={null}>
        
          <group ref={shellsGroupRef} >
            <group>
            <Ring ref={ringRef} />
         
            <OtherShell refShell1={shell1Ref}
              refShell2={shell2Ref}
              refShell3={shell3Ref}
              refShell4={shell4Ref}
              refShell5={shell5Ref}
              refShell6={shell6Ref}
              shellsGroupRef={shellsGroupRef}/>
            </group>
          </group>
          <Cloud position={[-15, 15, 20]} speed={0.2} opacity={0.1} color="#ED8A7C" volume={20} />
          <Cloud position={[25, 15, -10]} speed={0.2} opacity={0.1} color="#ED8A7C"/>
          <Cloud position={[-20, 15, -5]} speed={0.2} opacity={0.1} color="#ED8A7C" />
          <Cloud position={[5, 15, -10]} speed={0.2} opacity={0.1} color="#ED8A7C" />
          <Cloud position={[10, 15, 0]} speed={0.2} opacity={0.2} color="#ED8A7C"/>
          <Cloud position={[-10, 30, 30]} speed={0.2} opacity={0.2} color="#ED8A7C"/>
          <Cloud position={[20, 30, 30]} speed={0.2} opacity={0.2} color="#ED8A7C"/>
          <Cloud position={[15, 30, 30]} speed={0.2} opacity={0.2} color="#ED8A7C"/>

          <Sparkles count={100} scale={30} size={30} speed={0.4} />
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
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>

      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%) translateZ(-10px)',  // Adjust Z positioning
  opacity: 0.5, 
      }}>
        <h1
          style={{
            padding: '10px 20px',
            fontSize: '24rem',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Times',
            opacity: '0.5',  
          }}        
        >
         ONERING
        </h1>
      </div>
    </>
  );
};

export default ModelView;
