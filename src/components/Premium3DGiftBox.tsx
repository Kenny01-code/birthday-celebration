import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Float, Environment, PresentationControls, ContactShadows, Html, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { PremiumParticles } from './PremiumParticles';

interface Premium3DGiftBoxProps {
  onComplete: () => void;
}

export function Premium3DGiftBox({ onComplete }: Premium3DGiftBoxProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showSurprises, setShowSurprises] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => setShowSurprises(true), 1000);
    setTimeout(() => onComplete(), 5000);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={3} castShadow />
          
          <PremiumParticles />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.5, 0.5]}
            config={{ mass: 2, tension: 400 }}
          >
            <LuxuryGiftBox isOpened={isOpened} onOpen={handleOpen} />
            
            {showSurprises && (
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <group position={[0, 3, 0]}>
                  <Text3D
                    font="/fonts/Dancing_Script_Regular.json"
                    size={0.8}
                    height={0.1}
                    position={[-3, 0, 0]}
                  >
                    Surprise!
                    <meshStandardMaterial
                      color="#fbbf24"
                      emissive="#fbbf24"
                      emissiveIntensity={0.5}
                    />
                  </Text3D>
                  
                  {/* Floating hearts */}
                  {[...Array(12)].map((_, i) => (
                    <HeartShape key={i} position={[
                      Math.sin(i * 0.5) * 4,
                      Math.cos(i * 0.3) * 2,
                      Math.sin(i * 0.7) * 3
                    ]} />
                  ))}
                </group>
              </Float>
            )}
          </PresentationControls>
          
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.6}
            scale={15}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>

      {/* Premium UI */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-black/30 backdrop-blur-md rounded-full px-8 py-4 border border-yellow-400/50">
            <p className="text-yellow-300 text-2xl text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Interactive Gift Experience 🎁
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {showSurprises && (
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-pink-400 rounded-3xl p-8 shadow-2xl border-4 border-white">
                <p className="text-purple-900 text-3xl text-center font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  "You are the most precious gift in my life! 💖"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LuxuryGiftBox({ isOpened, onOpen }: { isOpened: boolean; onOpen: () => void }) {
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (boxRef.current) {
      if (!isOpened) {
        boxRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    
    if (lidRef.current && isOpened) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, -Math.PI / 2, 0.05);
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 2, 0.05);
      lidRef.current.position.z = THREE.MathUtils.lerp(lidRef.current.position.z, -1, 0.05);
    }
  });

  return (
    <group ref={boxRef} onClick={onOpen} position={[0, 0, 0]}>
      {/* Gift Box Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.3}
          roughness={0.4}
          emissive="#dc2626"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Gift Box Lid */}
      <group ref={lidRef} position={[0, 1.1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.4, 3.2]} />
          <meshStandardMaterial
            color="#dc2626"
            metalness={0.3}
            roughness={0.4}
            emissive="#dc2626"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Ribbon */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[3.4, 0.2, 0.3]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[3.4, 0.2, 0.3]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.8}
            roughness={0.2}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Bow */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.9}
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
      
      {/* Click instruction */}
      {!isOpened && (
        <Html position={[0, -2, 0]} center>
          <motion.div
            className="text-yellow-300 text-xl text-center pointer-events-none"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to open your gift! 🎁
          </motion.div>
        </Html>
      )}
    </group>
  );
}

function HeartShape({ position }: { position: [number, number, number] }) {
  const heartRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = state.clock.elapsedTime * 2;
      heartRef.current.position.y += Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.01;
    }
  });

  return (
    <mesh ref={heartRef} position={position}>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial
        color="#ec4899"
        emissive="#ec4899"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}