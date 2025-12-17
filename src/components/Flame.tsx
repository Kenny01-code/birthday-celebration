import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, AdditiveBlending } from 'three';

const Flame = (props) => {
  const innerFlameRef = useRef<any>();
  const outerFlameRef = useRef<any>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (innerFlameRef.current) {
      innerFlameRef.current.scale.y = (1 + Math.sin(time * 10)) * 0.15 + 0.8;
      innerFlameRef.current.scale.x = (1 + Math.cos(time * 8)) * 0.1 + 0.8;
    }
    if (outerFlameRef.current) {
      outerFlameRef.current.scale.y = (1 + Math.sin(time * 12)) * 0.15 + 0.9;
      outerFlameRef.current.scale.x = (1 + Math.cos(time * 10)) * 0.1 + 0.9;
    }
  });

  return (
    <group {...props}>
      <mesh ref={outerFlameRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color={new Color('#FF5733')}
          transparent
          opacity={0.6}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={innerFlameRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial
          color={new Color('#FFC300')}
          transparent
          opacity={0.8}
          blending={AdditiveBlending}
        />
      </mesh>
      <pointLight color="#FF5733" distance={1} intensity={2} />
    </group>
  );
};

export default Flame;
