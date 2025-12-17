import { useRef } from 'react';
import { Mesh } from 'three';
import Flame from './Flame';

const Candle = ({ isLit, onClick, ...props }) => {
  const candleRef = useRef<Mesh>(null);

  return (
    <group {...props} onClick={onClick}>
      <mesh ref={candleRef}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 32]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.3} metalness={0.2} />
      </mesh>
      {isLit && <Flame position={[0, 0.25, 0]} />}
    </group>
  );
};

export default Candle;
