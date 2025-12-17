import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
import { Confetti } from './Confetti';

interface InteractiveGiftBoxProps {
  onComplete: () => void;
}

export function InteractiveGiftBox({ onComplete }: InteractiveGiftBoxProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGiftClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 2) {
      setShowConfetti(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-pink-950 overflow-hidden flex items-center justify-center">
      <FloatingParticles />
      {showConfetti && <Confetti />}
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 text-center max-w-4xl px-8">
        <motion.h2
          className="text-5xl mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your Special Gift Awaits...
        </motion.h2>

        {/* Interactive Gift Box */}
        <div className="relative">
          <motion.div
            className="relative w-80 h-80 mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGiftClick}
          >
            {/* Gift Box Body */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-48 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-lg shadow-2xl"
              animate={clickCount > 0 ? { y: 10 } : {}}
            >
              {/* Box pattern */}
              <div className="absolute inset-4 border-4 border-yellow-300 rounded opacity-40" />
              <div className="absolute inset-8 border-2 border-yellow-200 rounded opacity-30" />
              
              {/* Vertical ribbon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-lg" />
            </motion.div>

            {/* Gift Box Lid */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-20 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-lg shadow-2xl origin-bottom"
              animate={clickCount > 0 ? { rotateX: -45, y: -30, z: 20 } : {}}
              style={{ transformStyle: 'preserve-3d' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Lid top */}
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded" />
              
              {/* Horizontal ribbon on lid */}
              <div className="absolute top-1/2 left-0 w-full h-12 transform -translate-y-1/2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-lg" />
              
              {/* Bow */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="relative w-24 h-16">
                  {/* Left bow loop */}
                  <div className="absolute left-0 top-0 w-10 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full transform -rotate-45" />
                  {/* Right bow loop */}
                  <div className="absolute right-0 top-0 w-10 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full transform rotate-45" />
                  {/* Center knot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full shadow-lg" />
                  {/* Ribbon tails */}
                  <div className="absolute top-8 left-4 w-4 h-8 bg-gradient-to-b from-red-600 to-red-700 transform rotate-12" />
                  <div className="absolute top-8 right-4 w-4 h-8 bg-gradient-to-b from-red-600 to-red-700 transform -rotate-12" />
                </div>
              </motion.div>
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Click instruction */}
          {clickCount === 0 && (
            <motion.p
              className="mt-12 text-2xl text-pink-200"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click the gift to unwrap your surprise! 🎁
            </motion.p>
          )}
        </div>

        {/* Stage 1: Love Note */}
        <AnimatePresence>
          {clickCount >= 1 && (
            <motion.div
              className="mt-16 p-8 bg-gradient-to-br from-pink-100 to-yellow-50 rounded-2xl shadow-2xl border-4 border-yellow-400 max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="relative">
                <Heart className="absolute -top-4 -right-4 w-12 h-12 text-red-500" fill="currentColor" />
                <p className="text-3xl text-purple-900 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  You make my world brighter ❤️
                </p>
                <p className="text-xl text-purple-800">
                  Every moment with you is a treasure, Gracia. Your smile lights up my life in ways words can't describe.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Golden Roses */}
        <AnimatePresence>
          {clickCount >= 2 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `${20 + Math.random() * 60}%`,
                    y: `${10 + Math.random() * 80}%`,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 1.5, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.15,
                    ease: 'easeOut',
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <path d="M50 80 C30 70, 20 50, 35 35 C40 30, 50 35, 50 35 C50 35, 60 30, 65 35 C80 50, 70 70, 50 80Z" fill="url(#goldGradient)" />
                    <circle cx="35" cy="40" r="8" fill="url(#goldGradient)" opacity="0.8" />
                    <circle cx="50" cy="35" r="10" fill="url(#goldGradient)" opacity="0.9" />
                    <circle cx="65" cy="40" r="8" fill="url(#goldGradient)" opacity="0.8" />
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Stage 3: Birthday Cake */}
        <AnimatePresence>
          {clickCount >= 3 && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setTimeout(() => onComplete(), 500);
                }
              }}
            >
              <motion.div
                className="relative"
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                {/* Birthday Cake */}
                <div className="relative">
                  {/* Cake layers */}
                  <div className="relative w-80">
                    {/* Top layer */}
                    <div className="h-20 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 rounded-t-3xl border-4 border-pink-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                      }} />
                    </div>
                    {/* Middle layer */}
                    <div className="h-24 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 border-x-4 border-purple-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20" style={{
                        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                      }} />
                    </div>
                    {/* Bottom layer */}
                    <div className="h-28 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-b-3xl border-4 border-yellow-500 border-t-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                      }} />
                    </div>

                    {/* Candles */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative">
                          {/* Flame */}
                          <motion.div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                            animate={{
                              scale: [1, 1.2, 1],
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          >
                            <div className="w-4 h-6 bg-gradient-to-t from-yellow-500 via-orange-500 to-red-500 rounded-full" />
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-yellow-300 rounded-full" />
                          </motion.div>
                          {/* Candle */}
                          <div className="w-3 h-12 bg-gradient-to-b from-red-400 to-red-600 rounded-t-sm" />
                        </div>
                      ))}
                    </div>

                    {/* Name on cake */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-8 py-4 rounded-2xl shadow-xl border-4 border-purple-400">
                      <p className="text-4xl text-purple-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Gracia
                      </p>
                    </div>
                  </div>
                </div>

                <motion.p
                  className="text-center mt-8 text-3xl text-white"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Make a wish! 🎂✨
                </motion.p>

                <motion.button
                  className="mt-8 mx-auto block px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 rounded-full shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onComplete()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Continue to Memories →
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
