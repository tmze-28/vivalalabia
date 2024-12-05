import React from 'react'

const PurpleOverlay = () => {
  return (
    <mesh position={[0, 0, 0.1]} rotation={[0, 0, 0]} renderOrder={999}>
      {/* A large plane */}
      <planeGeometry args={[100, 100]} />
      {/* Semi-transparent violet material with depthTest set to false */}
      <meshBasicMaterial 
        color="#2a0134" 
        transparent 
        opacity={0.8} 
        depthTest={false} 
      />
    </mesh>
  )
}

export default PurpleOverlay
