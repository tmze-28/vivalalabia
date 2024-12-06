import React, { Suspense, useRef, useState } from "react";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Sky, Environment, Sparkles, Cloud } from "@react-three/drei";
import { gsap } from "gsap";
// import PurpleOverlay from "./PurpleOverlay";
// import Effects from "./Effects";
// import { OrbitControls } from "@react-three/drei";
// import Loading from "./Loading";
import PurpleLight from "./PurpleLight";
// import TitleText from "./TitleText";

import OtherShell from "./OtherShell";
import WaterSurface from "./WaterSurface";
import Ring from "./Ring";
import Marquee from "./Marquee";

const ModelView = () => {
  // Animation State
  const [buttonText, setButtonText] = useState("Start your animation");
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [showPurpleLight, setShowPurpleLight] = useState(true); // Zustand für die Sichtbarkeit von PurpleLight
  const [showDirectionalLights, setShowDirectionalLights] = useState(false);

  // Refs for objects
  const shell1Ref = useRef();
  const shell2Ref = useRef();
  const shell3Ref = useRef();
  const shell4Ref = useRef();
  const shell5Ref = useRef();
  const shell6Ref = useRef();
  const shellsGroupRef = useRef();
  const ringRef = useRef();
  const cameraRef = useRef(); // Camera reference
  const marqueeRef = useRef(); // Marquee reference

  // Light and Environment State
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(1);
  const [ambientColor, setAmbientColor] = useState("#1F073E");
  const [environmentPreset, setEnvironmentPreset] = useState("night");

  //Sonnenposition
  const [sunPosition, setSunPosition] = useState([0, 1, 0]); // Default for "night"

  const toggleEnvironment = () => {
    // Wenn die aktuelle Umgebung "night" ist, wechsel zu "warehouse"
    if (environmentPreset === "night") {
      setEnvironmentPreset("warehouse");
      setAmbientColor("#FFD27F"); // Warehouse Farbänderung
      setAmbientLightIntensity(0);
      setSunPosition([100, 100, 50]);
    }
  };

  useEffect(() => {
    // Hier kannst du Debug-Ausgaben machen oder mit gsap Animationen durchführen
    console.log("Sun Position updated:", sunPosition);
  }, [sunPosition]);

  //Wasserfarbe ändern
  const [waterColor, setWaterColor] = useState(0x201c3d); // Startfarbe #201C3D

  const [isWaterColorAnimated, setIsWaterColorAnimated] = useState(false); // Zustand für die Animation der Wasserfarbe

  const handleChangeColor = () => {
    // Wenn die Wasserfarbe bereits animiert wurde, nichts tun
    if (isWaterColorAnimated) return;

    // Bestimme die Zielfarbe
    const targetColor = waterColor === 0x201c3d ? 0x99c0e3 : 0x99c0e3;

    // Verwende gsap, um die Farbänderung zu animieren
    gsap.to(
      {},
      {
        duration: 10,
        ease: "power2.out",
        onUpdate: () => {
          setWaterColor(targetColor); // Setze die Ziel-Farbe direkt
        },
        onComplete: () => {
          setIsWaterColorAnimated(true); // Setze den Zustand, dass die Animation abgeschlossen ist
        },
      }
    );
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
    setShowPurpleLight(false); // PurpleLight ausblenden
    setShowDirectionalLights(true); // Zeige die Lichter an
    toggleEnvironment();
    handleChangeColor();

    gsap.to(PurpleLight, {
      opacity: 0,
      duration: 1,
      onComplete: () => setShowPurpleLight(false),
    });

    // Fade out Marquee
    gsap.to(marqueeRef.current, {
      opacity: 0,
      duration: 2,
      ease: "back.out(1.7)",
      onComplete: () => {
        marqueeRef.current.style.display = "none";
      },
    });

    if (!isAnimationStarted) {
      gsap.killTweensOf(shellsGroupRef.current.rotation);
      gsap.to(shellsGroupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0,
      });

      gsap.to(
        [
          shell4Ref.current.position,
          shell5Ref.current.position,
          shell6Ref.current.position,
        ],
        {
          y: "-=20",
          duration: 8,
          ease: "back.out(1.7)",
        }
      );

      gsap.to([shell1Ref.current.position], {
        z: -3,
        x: 0,
        y: 0,
        duration: 8,
        ease: "back.out(1.7)",
      });

      gsap.to([shell2Ref.current.position], {
        z: -4,
        x: -4,
        y: -0.6,
        duration: 10,
        ease: "back.out(1.7)",
      });

      gsap.to([shell3Ref.current.position], {
        z: -4,
        x: 3,
        y: -0.6,
        duration: 8,
        ease: "back.out(1.7)",
      });

      gsap.to([shell1Ref.current.rotation], {
        y: -Math.PI / 3,

        duration: 8,
        ease: "power2.out",
      });

      gsap.to([shell2Ref.current.rotation], {
        y: -Math.PI,

        duration: 8,
        ease: "power2.out",
      });

      gsap.to([shell3Ref.current.rotation], {
        y: Math.PI / 4,
        duration: 8,
        ease: "power2.out",
      });

      gsap.to([ringRef.current.position], {
        y: 10,
        z: 0,
        duration: 8,
        ease: "power2.out",
      });

      // Add animation logic for shells and ring
      gsap.to([ringRef.current.rotation], {
        y: "+=6.28",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      setTimeout(() => setButtonText("Yes, I want it"), 5000);
      setIsAnimationStarted(true);
    } else {
      handleMoveRingUp();
    }
  };

  const handleMoveRingUp = () => {
    console.log("Move Ring Up");
    // toggleEnvironment();
    // handleChangeColor();
    gsap.to(ringRef.current.position, {
      y: 48,
      duration: 8,
      ease: "power2.out",
    });

    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        z: 18,
        y: 50,
        duration: 8,
        ease: "power2.out",
      });
    }

    setButtonText("Ring is up");
  };

  const CameraControls = () => {
    const { camera } = useThree();
    cameraRef.current = camera;
    return null;
  };

  return (
    <>
      <Canvas camera={{ position: [0, 10, 40], fov: 40 }}>
        {/* <OrbitControls/> */}

        <Sky
          scale={1000}
          sunPosition={sunPosition}
          turbidity={10}
          rayleigh={0}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />

        <ambientLight intensity={ambientLightIntensity} color={ambientColor} />
        {/* Directional Lights */}

        <spotLight position={[0, 11, 5]} color="#DFA30C" intensity={5} />
        <directionalLight
          position={[0, 3, 10]}
          color="#DFA30C"
          intensity={0.5}
        />

        {showDirectionalLights && (
          <>
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight
              position={[0, 10, 0]}
              color="#FFFFFF"
              intensity={0.1}
            />
          </>
        )}

        <Environment preset={environmentPreset} background />

        <CameraControls />
        <Suspense fallback={null}>
          {/* <Effects/> */}
          <group ref={shellsGroupRef}>
            <Ring ref={ringRef} />
            <OtherShell
              refShell1={shell1Ref}
              refShell2={shell2Ref}
              refShell3={shell3Ref}
              refShell4={shell4Ref}
              refShell5={shell5Ref}
              refShell6={shell6Ref}
              shellsGroupRef={shellsGroupRef}
            />
          </group>
          <Cloud
            position={[-15, 15, 20]}
            speed={0.2}
            opacity={0.1}
            color="#ED8A7C"
            volume={20}
          />
          <Cloud
            position={[25, 15, -10]}
            speed={0.2}
            opacity={0.1}
            color="#ED8A7C"
          />
          <Cloud
            position={[-20, 15, -5]}
            speed={0.2}
            opacity={0.1}
            color="#ED8A7C"
          />
          <Cloud
            position={[5, 15, -10]}
            speed={0.2}
            opacity={0.1}
            color="#ED8A7C"
          />
          <Cloud
            position={[10, 15, 0]}
            speed={0.2}
            opacity={0.2}
            color="#ED8A7C"
          />
          <Cloud
            position={[-10, 30, 30]}
            speed={0.2}
            opacity={0.2}
            color="#ED8A7C"
          />
          <Cloud
            position={[20, 30, 30]}
            speed={0.2}
            opacity={0.2}
            color="#ED8A7C"
          />
          <Cloud
            position={[15, 30, 30]}
            speed={0.2}
            opacity={0.2}
            color="#ED8A7C"
          />

          {/* <TitleText/> */}
          <Sparkles count={100} scale={30} size={30} speed={0.4} />
          <WaterSurface waterColor={0xd6a599} />
        </Suspense>
        {/* Rendere PurpleLight nur, wenn showPurpleLight true ist */}
        {showPurpleLight && <PurpleLight />}
        {/* <PurpleOverlay /> */}
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%) translateZ(-10px)",
          opacity: 0.5,
        }}
      >
        <h1
          style={{
            fontSize: "27rem",
            color: "white",
            fontFamily: "Times",
            opacity: 0.5,
          }}
        >
          ONERING
        </h1>
        <Marquee ref={marqueeRef} />
      </div>
    </>
  );
};

export default ModelView;
