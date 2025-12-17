import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { Text } from '@react-three/drei';
import Candle from './Candle';

const Cake = ({ litCandles, onCandleClick }) => {
  const cakeRef = useRef<Mesh>(null);

  useFrame(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.005;
    }
  });

  const candles = [];
  const numCandles = 17;
  const radius = 1.2;

  for (let i = 0; i < numCandles; i++) {
    const angle = (i / numCandles) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    candles.push(<Candle key={i} position={[x, 1.15, z]} isLit={litCandles.has(i)} onClick={() => onCandleClick(i)} />);
  }

  return (
    <group ref={cakeRef}>
      {/* Cake Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[2, 2, 1, 64]} />
        <meshStandardMaterial color="#A0522D" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Second Layer */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.8, 64]} />
        <meshStandardMaterial color="#D2691E" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Top Layer */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.6, 64]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Icing */}
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.1, 16, 100]} />
        <meshStandardMaterial color="white" roughness={0.1} />
      </mesh>

      {/* Glowing Name */}
      <group position={[0, 1.3, 0]}>
        <Text
          fontSize={0.5}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          Gracia
          <meshBasicMaterial emissive={new Color("#FFD700")} emissiveIntensity={5} toneMapped={false} />
        </Text>
        <pointLight color="#FFD700" distance={2} intensity={5} />
      </group>

      {candles}
    </group>
  );
};

export default Cake;