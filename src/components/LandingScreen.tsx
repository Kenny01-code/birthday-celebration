import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface LandingScreenProps {
  onEnter: () => void;
  onMusicStart: () => void;
}

export function LandingScreen({ onEnter, onMusicStart }: LandingScreenProps) {
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const startAudio = () => {
    if (!audioStarted) {
      onMusicStart();
      setAudioStarted(true);
    }
  };

  const handleDoorClick = () => {
    setIsDoorsOpen(true);
    setShowEnterButton(true);
    // Auto-start music surprise when doors open
    if (!audioStarted) {
      onMusicStart();
      setAudioStarted(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 overflow-hidden flex items-center justify-center">
      <FloatingParticles />
      
      {/* Velvet texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8 md:mb-12"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            animate={{
              textShadow: [
                '0 0 20px rgba(251, 191, 36, 0.5)',
                '0 0 30px rgba(251, 191, 36, 0.7)',
                '0 0 20px rgba(251, 191, 36, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy Birthday, Gracia 💖
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-pink-200 px-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            December 17th — A Special Day for an Extraordinary Girl
          </motion.p>
        </motion.div>

        {/* Golden Doors */}
        <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] md:w-96 md:h-[500px] mx-auto perspective-1000">
          <motion.div
            className="absolute inset-0 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleDoorClick}
          >
            {/* Door Frame */}
            <div className="absolute inset-0 rounded-lg border-8 border-yellow-600 shadow-2xl" />
            
            {/* Left Door */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-l-lg border-r-4 border-yellow-700 origin-left"
              animate={isDoorsOpen ? { rotateY: -120 } : { rotateY: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-4 border-2 border-yellow-400 rounded-lg opacity-50" />
              <div className="absolute top-1/2 right-4 w-4 h-4 bg-yellow-900 rounded-full transform -translate-y-1/2" />
              {/* Door decorations */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-300 opacity-60" />
              </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-yellow-600 via-yellow-500 to-yellow-600 rounded-r-lg border-l-4 border-yellow-700 origin-right"
              animate={isDoorsOpen ? { rotateY: 120 } : { rotateY: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-4 border-2 border-yellow-400 rounded-lg opacity-50" />
              <div className="absolute top-1/2 left-4 w-4 h-4 bg-yellow-900 rounded-full transform -translate-y-1/2" />
              {/* Door decorations */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-300 opacity-60" />
              </div>
            </motion.div>

            {/* Inner glow */}
            <AnimatePresence>
              {isDoorsOpen && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 opacity-60 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
            </AnimatePresence>
          </motion.div>


        </div>

        {/* Enter button */}
        <AnimatePresence>
          {showEnterButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="mt-8 md:mt-16 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-purple-900 rounded-full shadow-2xl border-2 border-yellow-300"
            >
              <span className="text-xl sm:text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Enter the Experience ✨
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating hearts and stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          {i % 2 === 0 ? (
            <Heart className="w-6 h-6 text-pink-300 opacity-40" fill="currentColor" />
          ) : (
            <Sparkles className="w-6 h-6 text-yellow-300 opacity-40" />
          )}
        </motion.div>
      ))}
      

      

    </div>
  );
}
