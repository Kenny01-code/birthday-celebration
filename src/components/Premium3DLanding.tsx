import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Float, Sparkles, Environment, PresentationControls, ContactShadows, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

interface Premium3DLandingProps {
  onEnter: () => void;
  onMusicStart: () => void;
}

export function Premium3DLanding({ onEnter, onMusicStart }: Premium3DLandingProps) {
  const [isReady, setIsReady] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    onMusicStart();
    setShowEnter(true);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 overflow-hidden">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
          
          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.5}>
              <Text3D
                font="/fonts/Dancing_Script_Regular.json"
                size={1.2}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-6, 2, 0]}
              >
                Happy Birthday
                <meshStandardMaterial
                  color="#fbbf24"
                  metalness={0.8}
                  roughness={0.2}
                  emissive="#fbbf24"
                  emissiveIntensity={0.3}
                />
              </Text3D>
              
              <Text3D
                font="/fonts/Dancing_Script_Regular.json"
                size={2}
                height={0.3}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.03}
                bevelOffset={0}
                bevelSegments={5}
                position={[-3, -1, 0]}
              >
                Gracia
                <meshStandardMaterial
                  color="#ec4899"
                  metalness={0.9}
                  roughness={0.1}
                  emissive="#ec4899"
                  emissiveIntensity={0.4}
                />
              </Text3D>
            </Float>
            
            <Sparkles
              count={200}
              scale={[20, 20, 20]}
              size={6}
              speed={0.4}
              opacity={0.6}
              color="#fbbf24"
            />
            
            <GoldenDoors onOpen={handleStart} />
          </PresentationControls>
          
          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>

      {/* Premium UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="bg-black/20 backdrop-blur-md rounded-full px-8 py-4 border border-yellow-400/30">
            <p className="text-yellow-300 text-xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              December 17th — A Luxury Experience ✨
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {showEnter && (
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(251, 191, 36, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="px-12 py-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-purple-900 rounded-full shadow-2xl border-4 border-yellow-300 font-bold text-2xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Enter Luxury Experience ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Loading */}
      {!isReady && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-8 mx-auto"></div>
            <p className="text-yellow-300 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Preparing luxury experience...
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function GoldenDoors({ onOpen }: { onOpen: () => void }) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen();
    }
  };

  useFrame((state) => {
    if (leftDoorRef.current && rightDoorRef.current) {
      if (isOpen) {
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, -Math.PI / 2, 0.05);
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, Math.PI / 2, 0.05);
      }
      
      // Subtle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      leftDoorRef.current.scale.setScalar(1 + breathe);
      rightDoorRef.current.scale.setScalar(1 + breathe);
    }
  });

  return (
    <group position={[0, -2, 2]} onClick={handleClick}>
      {/* Door Frame */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[6, 8, 0.2]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Left Door */}
      <group ref={leftDoorRef} position={[-1.5, 0, 0]}>
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[3, 8, 0.3]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Door Handle */}
        <mesh position={[2.5, 0, 0.2]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#d97706" metalness={1} roughness={0} />
        </mesh>
      </group>
      
      {/* Right Door */}
      <group ref={rightDoorRef} position={[1.5, 0, 0]}>
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[3, 8, 0.3]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Door Handle */}
        <mesh position={[-2.5, 0, 0.2]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#d97706" metalness={1} roughness={0} />
        </mesh>
      </group>
      
      {/* Click instruction */}
      {!isOpen && (
        <Html position={[0, -5, 0]} center>
          <motion.div
            className="text-yellow-300 text-xl text-center pointer-events-none"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click the golden doors ✨
          </motion.div>
        </Html>
      )}
    </group>
  );
}