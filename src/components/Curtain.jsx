import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'; // Um auf Lichtquellen zuzugreifen

// Verwende forwardRef, um die Ref an das Group-Element weiterzugeben
const Curtain = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/curtain2.glb");

  // Materialfarbe auf Rot setzen
  materials.color = materials.color || new THREE.MeshStandardMaterial();
  materials.color.color.set(0x3c0010); // Rot in Hex

  return (
    <group {...props} ref={ref} dispose={null}>
      <group scale={0.06}>
        <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["curtain-blue&white_color_0"].geometry}
            material={materials.color} // Das Material wird hier gesetzt
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["curtain-blue&white_curtain-stand-steel_0"].geometry}
            material={materials["curtain-stand-steel"]}
          />
        </group>
      </group>
      
      {/* Füge ein DirectionalLight hinzu, das auf die Vorhänge strahlt */}
      <directionalLight
        position={[5, 10, 5]}  // Position des Lichts
        intensity={1}           // Lichtstärke
        castShadow
      />
    </group>
  );
});

useGLTF.preload("/curtain2.glb");

export default Curtain;
