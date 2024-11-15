import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

// Verwenden von forwardRef, um den Ref an die äußere Komponente weiterzugeben
const Ring = React.forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/ring.glb');
  
  const ringRef = useRef(null);

  // Wenn der Ref von der übergeordneten Komponente übergeben wird, wird er an den internen Ref weitergegeben
  const combinedRef = ref || ringRef;

  return (
    <group {...props} dispose={null} position={[1, 5, -5]} scale={[2, 2, 2]} rotation={[0, 1, 1]} ref={combinedRef}>
      <group position={[-3.456, 0.116, 0.361]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object004__0.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object004__0_1.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
      <group position={[0, 0.116, 0.361]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object005__0.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object005__0_1.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
      <group position={[0, 0.116, -0.361]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object006__0.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object006__0_1.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
      <group position={[3.456, 0.116, -0.361]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object007__0.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object007__0_1.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001__0.geometry}
        material={materials['Scene_-_Root']}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LineVenz00__0.geometry}
        material={materials['Scene_-_Root']}
        position={[0.864, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LineVenz03__0.geometry}
        material={materials['Scene_-_Root']}
        position={[2.592, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LineVenz02__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-2.592, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LineVenz01__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-0.864, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008__0.geometry}
        material={materials['Scene_-_Root']}
        position={[0.864, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009__0.geometry}
        material={materials['Scene_-_Root']}
        position={[2.592, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010__0.geometry}
        material={materials['Scene_-_Root']}
        position={[1.728, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011__0.geometry}
        material={materials['Scene_-_Root']}
        position={[0, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012__0.geometry}
        material={materials['Scene_-_Root']}
        position={[3.456, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-1.728, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-3.456, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-0.864, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016__0.geometry}
        material={materials['Scene_-_Root']}
        position={[-2.592, 0.175, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload('/ring.glb');

export default Ring;
