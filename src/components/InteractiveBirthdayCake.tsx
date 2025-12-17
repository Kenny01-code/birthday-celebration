import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Heart, Star, Share2, Copy } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Point, PointMaterial } from '@react-three/drei';

import Cake from './Cake';

interface InteractiveBirthdayCakeProps {
  onComplete: () => void;
}

export function InteractiveBirthdayCake({ onComplete }: InteractiveBirthdayCakeProps) {
  const [litCandles, setLitCandles] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const totalCandles = 17; // Gracia's age
  const candles = Array.from({ length: totalCandles }, (_, i) => i);

  const handleCandleClick = (candleIndex: number) => {
    if (!litCandles.has(candleIndex)) {
      setLitCandles(prev => {
        const newSet = new Set([...prev, candleIndex]);
        
        // Add sparkle effect
        const newSparkle = { id: Date.now(), x: (candleIndex * 40) + 20, y: 100 };
        setSparkles(prev => [...prev, newSparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 2000);

        // Check if all candles are lit
        if (newSet.size === totalCandles) {
          setTimeout(() => setShowCelebration(true), 1000);
        }
        
        return newSet;
      });
    }
  };

  const makeWish = () => {
    setWishMade(true);
    // Blow out all candles with animation
    setTimeout(() => {
      setLitCandles(new Set());
      setTimeout(() => onComplete(), 2000);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center" style={{
      background: `
        radial-gradient(circle at 50% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
      `
    }}>
      
      <div className="relative z-10 text-center">
        <motion.h2
          className="text-6xl mb-12 luxury-text font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Light Gracia's Birthday Candles! 🕯️
        </motion.h2>

        <motion.p
          className="text-2xl text-white mb-8 font-light"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click each candle to light it up! ({litCandles.size}/{totalCandles} lit)
        </motion.p>

        {/* Birthday Cake */}
        <div className="relative mx-auto mb-12 h-96 w-full">
          <Suspense fallback={<div>Loading 3D Cake...</div>}>
            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <Cake litCandles={litCandles} onCandleClick={handleCandleClick} />
            </Canvas>
          </Suspense>
        </div>

        {/* Make a Wish Button */}
        <AnimatePresence>
          {litCandles.size > 0 && !wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-8"
            >
              <motion.button
                className="px-16 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-2xl border-4 border-yellow-400 font-bold text-3xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={makeWish}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.5)",
                    "0 0 40px rgba(255, 215, 0, 0.8)",
                    "0 0 20px rgba(255, 215, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Make a Wish & Blow Out Candles ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wish Made Message */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="diamond-border rounded-3xl p-8 velvet-texture backdrop-blur-md mx-auto max-w-2xl"
              style={{ background: 'rgba(255, 215, 0, 0.1)' }}
            >
              <motion.h3
                className="text-4xl text-white font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟 Wish Made! 🌟
              </motion.h3>
              <p className="text-2xl text-white" style={{ fontFamily: "'Dancing Script', cursive" }}>
                May all your dreams come true, Gracia! 💖
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Effects */}
        <AnimatePresence>
          {showCelebration && (
            <>
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                    y: [0, -100]
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity
                  }}
                >
                  {i % 3 === 0 ? (
                    <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
                  ) : i % 3 === 1 ? (
                    <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  )}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .luxury-text {
          background: linear-gradient(45deg, #ffd700, #ffed4e, #fff700, #ffd700);
          background-size: 400% 400%;
          animation: luxuryGlow 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
        }
        @keyframes luxuryGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .diamond-border {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .diamond-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #ffd700, #fff, #ffd700, #fff, #ffd700);
          background-size: 400% 400%;
          border-radius: inherit;
          z-index: -1;
          animation: diamondShine 2s linear infinite;
        }
        @keyframes diamondShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
        .velvet-texture {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        /* Ultra-realistic flame effects */
        .flame-container {
          filter: blur(0.5px) brightness(1.2) contrast(1.1);
        }
        
        .flame-outer {
          background: radial-gradient(ellipse 60% 100% at 50% 100%, 
            #8B0000 0%, #DC143C 15%, #FF4500 35%, #FF6347 55%, transparent 80%);
          clip-path: ellipse(60% 85% at 50% 100%);
          animation: flameFlicker1 2s ease-in-out infinite;
        }
        
        .flame-middle {
          background: radial-gradient(ellipse 45% 80% at 50% 100%, 
            #FF4500 0%, #FF6347 20%, #FFA500 45%, #FFD700 70%, transparent 85%);
          clip-path: ellipse(45% 75% at 50% 100%);
          animation: flameFlicker2 1.8s ease-in-out infinite;
        }
        
        .flame-inner {
          background: radial-gradient(ellipse 30% 60% at 50% 100%, 
            #FFA500 0%, #FFD700 30%, #FFFF00 60%, #FFFACD 80%, transparent 90%);
          clip-path: ellipse(30% 65% at 50% 100%);
          animation: flameFlicker3 1.5s ease-in-out infinite;
        }
        
        .flame-core {
          background: radial-gradient(ellipse 15% 40% at 50% 100%, 
            #FFFFFF 0%, #FFFACD 40%, #FFD700 70%, transparent 85%);
          clip-path: ellipse(15% 45% at 50% 100%);
          animation: flameFlicker4 1.2s ease-in-out infinite;
          filter: brightness(1.5);
        }
        
        @keyframes flameFlicker1 {
          0%, 100% { transform: scaleY(1) scaleX(1) rotate(0deg); }
          25% { transform: scaleY(1.1) scaleX(0.95) rotate(-2deg); }
          50% { transform: scaleY(0.9) scaleX(1.05) rotate(1deg); }
          75% { transform: scaleY(1.05) scaleX(0.98) rotate(-1deg); }
        }
        
        @keyframes flameFlicker2 {
          0%, 100% { transform: scaleY(1) scaleX(1) rotate(0deg); }
          30% { transform: scaleY(1.15) scaleX(0.9) rotate(2deg); }
          60% { transform: scaleY(0.85) scaleX(1.1) rotate(-1.5deg); }
        }
        
        @keyframes flameFlicker3 {
          0%, 100% { transform: scaleY(1) scaleX(1) rotate(0deg); }
          40% { transform: scaleY(1.2) scaleX(0.85) rotate(-2.5deg); }
          80% { transform: scaleY(0.8) scaleX(1.15) rotate(1.5deg); }
        }
        
        @keyframes flameFlicker4 {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.9; }
          50% { transform: scaleY(1.3) scaleX(0.8); opacity: 1; }
        }
        
        /* Ultra-realistic candle */
        .candle-body {
          background: linear-gradient(to bottom, 
            #FFFACD 0%, #F0E68C 10%, #DAA520 20%, #B8860B 40%, 
            #CD853F 60%, #A0522D 80%, #8B4513 100%);
          border-radius: 50% 50% 0 0;
          position: relative;
        }
        
        .candle-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          width: 30%;
          height: 60%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%);
          border-radius: 50%;
          filter: blur(1px);
        }
        
        .wax-drip {
          animation: waxDrip 4s ease-in-out infinite;
        }
        
        @keyframes waxDrip {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}