import { EffectComposer } from '@react-three/postprocessing';
import { LUT } from '@react-three/postprocessing';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export const Effects = () => {
  const lut = useLoader(TextureLoader, '/png/evening.png'); // Dein LUT-Bild

  return (
    <EffectComposer>
      <LUT lut={lut} />
    </EffectComposer>
  );
};

export default Effects;
