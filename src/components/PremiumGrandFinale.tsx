import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Float, Environment, PresentationControls, Html, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { PremiumParticles } from './PremiumParticles';

export function PremiumGrandFinale() {
  const [showVideo, setShowVideo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowVideo(true), 2000);
    const timer2 = setTimeout(() => setShowMessage(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Premium Video Background */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              src="/graciavideo.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Scene Overlay */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={3} />
            
            <PremiumParticles />
            
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-0.1, 0.1]}
              azimuth={[-0.2, 0.2]}
              config={{ mass: 2, tension: 400 }}
            >
              <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
                <group position={[0, 2, 0]}>
                  <Text3D
                    font="/fonts/Dancing_Script_Regular.json"
                    size={1.5}
                    height={0.3}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.05}
                    bevelSize={0.05}
                    position={[-6, 1, 0]}
                  >
                    Happy Birthday
                    <meshStandardMaterial
                      color="#fbbf24"
                      metalness={0.9}
                      roughness={0.1}
                      emissive="#fbbf24"
                      emissiveIntensity={0.4}
                    />
                  </Text3D>
                  
                  <Text3D
                    font="/fonts/Dancing_Script_Regular.json"
                    size={2.5}
                    height={0.4}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.07}
                    bevelSize={0.07}
                    position={[-4, -2, 0]}
                  >
                    Gracia
                    <meshStandardMaterial
                      color="#ec4899"
                      metalness={1}
                      roughness={0}
                      emissive="#ec4899"
                      emissiveIntensity={0.5}
                    />
                  </Text3D>
                </group>
              </Float>
              
              <Sparkles
                count={500}
                scale={[30, 30, 30]}
                size={8}
                speed={0.6}
                opacity={0.8}
                color="#fbbf24"
              />
              
              {/* Floating 3D Hearts */}
              {[...Array(20)].map((_, i) => (
                <FloatingHeart3D
                  key={i}
                  position={[
                    Math.sin(i * 0.5) * 8,
                    Math.cos(i * 0.3) * 4,
                    Math.sin(i * 0.7) * 6
                  ]}
                  delay={i * 0.1}
                />
              ))}
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Premium UI Messages */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {showMessage && (
            <>
              <motion.div
                className="absolute top-20 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -100, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", duration: 1.5 }}
              >
                <div className="bg-gradient-to-r from-yellow-400/90 via-pink-400/90 to-purple-400/90 backdrop-blur-md rounded-3xl px-12 py-8 border-4 border-white shadow-2xl">
                  <h1 className="text-5xl text-white text-center font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    You Are My Everything ✨
                  </h1>
                  <p className="text-2xl text-white text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    The most precious gift in my life 💖
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <div className="bg-black/70 backdrop-blur-md rounded-2xl px-8 py-6 border-2 border-yellow-400">
                  <p className="text-3xl text-yellow-300 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    May your 17th birthday be filled with endless joy! 🎂🎉
                  </p>
                </div>
              </motion.div>

              {/* Luxury Confetti Effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(100)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#ec4899' : '#8b5cf6',
                      left: `${Math.random() * 100}%`,
                      top: '-10px'
                    }}
                    animate={{
                      y: window.innerHeight + 50,
                      rotate: 360,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Audio Visualizer */}
      <div className="absolute bottom-8 right-8 z-30">
        <motion.div
          className="flex space-x-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-yellow-400 to-pink-400 rounded-full"
              animate={{
                height: [20, 40, 20]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FloatingHeart3D({ position, delay }: { position: [number, number, number]; delay: number }) {
  const heartRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = state.clock.elapsedTime * 2 + delay;
      heartRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + delay) * 0.02;
      heartRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={heartRef} position={position}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}