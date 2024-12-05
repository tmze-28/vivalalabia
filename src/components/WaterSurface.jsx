import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Water } from 'three-stdlib'

extend({ Water })

function WaterSurface({ waterColor }) { // Nimm waterColor als Prop entgegen
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor, // Verwende die übergebene Prop hier
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals, waterColor] // Aktualisiere, wenn waterColor sich ändert
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.material.uniforms.waterColor.value.set(waterColor)
    }
  }, [waterColor]) // Aktualisiert die Farbe dynamisch

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta
    }
  })

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

export default WaterSurface
