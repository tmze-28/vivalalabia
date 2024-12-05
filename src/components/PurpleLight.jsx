import React from 'react'




const PurpleLight = () => {
  return (
    
    <directionalLight
      position={[0, 5, 50]}  // Position the light near the shells
      intensity={5}  // Adjust light intensity as needed
      color="#39086D"  // Set the light color to violet
      decay={2}  // Optional: controls how quickly the light fades with distance
    />
  )
}

export default PurpleLight