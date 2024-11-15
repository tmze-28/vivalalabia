import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap';
// import { useFrame } from '@react-three/fiber';

export default function Shell({ refShell1, refShell2, refShell3, refShell4, refShell5, refShell6, shellsGroupRef, ...props }) {
  const { nodes, materials } = useGLTF('/abalone_shell.glb')

  // Verweise auf die Muscheln, die aus den Props kommen
  const shell1Ref = refShell1 || useRef(null);
  const shell2Ref = refShell2 || useRef(null);
  const shell3Ref = refShell3 || useRef(null);
  const shell4Ref = refShell4 || useRef(null);
  const shell5Ref = refShell5 || useRef(null);
  const shell6Ref = refShell6 || useRef(null);

  // const innerGroupRef = useRef();

  useEffect(() => {
    // GSAP Animation für kontinuierliche Drehung der Muscheln
    if (shellsGroupRef.current) {

      
      console.log("Aktuelle Position der Gruppe:", shellsGroupRef.current.position);

      // Stelle sicher, dass die Gruppe richtig positioniert ist, z.B.:
      shellsGroupRef.current.position.set(-3, 0, 0);  // Oder eine andere Position

      // gsap.to(shellsGroupRef.current.rotation, {
      //   y: "+=6.28",     // Eine komplette Umdrehung (2 * Pi)
      //   duration: 30,
      //   repeat: -1,
      //   ease: "linear",
      // });

      
    }
  }, [shellsGroupRef]);



  // useFrame(() => {
  //   if (shellsGroupRef.current) {
  //     // Aktualisiere die Rotation um die y-Achse
  //     shellsGroupRef.current.rotation.y += 0.005; // Passe den Wert für eine langsamere/schnellere Rotation an
      
  //   }
  // });

  return (
    <group {...props} ref={shellsGroupRef} dispose={null} position={[0, 0, 0]}>
      <group > {/* Innere Gruppe für die lokale Achse */}
      {/* Erste Muschel */}
      <group ref={shell1Ref} position={[2, 0, 0]} scale={[5, 5, 5]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.Iridescent} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.Iridescent} />
      </group>

      {/* Zweite Muschel */}
      <group ref={shell2Ref} position={[-2, 0, -8]} scale={[5, 5, 5]} rotation={[-Math.PI / 2, 0, 1.2]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.Iridescent} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.Iridescent} />
      </group>

      {/* Weitere Muscheln */}
      {/* Wiederhole den gleichen Ansatz für alle anderen Muscheln */}

      {/* Dritte Muschel */}
      <group ref={shell3Ref} position={[6, 0, -8]} scale={[5, 5, 5]} rotation={[-Math.PI / 2, 0, -1.2]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.Abalone_Shell} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.Iridescent} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.Iridescent} />
      </group>

     {/* Vierte Muschel */}
     <group ref={shell4Ref} position={[6, -3, -3]} scale={[5, 5, 5]} rotation={[-1.2, 0.2, -2.2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Iridescent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Iridescent}
          />
        </group>

        {/* Fünfte Muschel */}
        <group ref={shell5Ref} position={[-3.4, -3, -4]} scale={[5, 5, 5]} rotation={[-1.6, -0.2, 1.7]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Iridescent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Iridescent}
          />
        </group>

        {/* Sechste Muschel */}
        <group ref={shell6Ref} position={[0.5, -3, -12]} scale={[5, 5, 5]} rotation={[-1.8, 0.2, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Abalone_Shell}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Iridescent}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Iridescent}
          />
          </group>
        </group>
    </group>
  )
}

// Preload the GLTF model to optimize loading
useGLTF.preload('/abalone_shell.glb')
