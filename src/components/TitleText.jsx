import * as THREE from 'three'; // Importiere THREE
import React from 'react';
import { Text } from '@react-three/drei';

const TitleText = () => {
  return (
    
    <Text 
    fontSize={0.3}
    position={[0, 1.2, 0.01]}
    maxWidth={1}
    textAlign="center"
    font="/fonts/Poppins-Regular.ttf"
    >
     Das ist ein Titel Text
      <meshStandardMaterial color={"#FF1888"} />
    </Text>
  
  )
}

export default TitleText