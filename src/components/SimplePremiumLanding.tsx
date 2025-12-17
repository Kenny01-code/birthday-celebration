import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface SimplePremiumLandingProps {
  onEnter: () => void;
  onMusicStart: () => void;
}

export function SimplePremiumLanding({ onEnter, onMusicStart }: SimplePremiumLandingProps) {
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
    startAudio();
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 overflow-hidden flex items-center justify-center">
      {/* Premium Particle Background */}
      <PremiumParticleBackground />
      
      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30" />
      
      {/* Premium Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="mb-16"
        >
          <motion.h1
            className="text-8xl mb-6 font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              textShadow: '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)'
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(251, 191, 36, 0.8)',
                '0 0 80px rgba(251, 191, 36, 1)',
                '0 0 40px rgba(251, 191, 36, 0.8)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Happy Birthday, Gracia 💖
          </motion.h1>
          
          <motion.p
            className="text-3xl text-pink-200 mb-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            December 17th — A Luxury Experience
          </motion.p>
          
          <motion.div
            className="text-xl text-yellow-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            ✨ Premium Birthday Celebration ✨
          </motion.div>
        </motion.div>

        {/* Luxury 3D-Style Doors */}
        <div className="relative w-[500px] h-[600px] mx-auto perspective-1000 mb-16">
          <motion.div
            className="absolute inset-0 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleDoorClick}
          >
            {/* Premium Door Frame */}
            <div className="absolute inset-0 rounded-2xl border-8 border-gradient-to-r from-yellow-500 to-yellow-600 shadow-2xl bg-gradient-to-br from-yellow-600 to-yellow-700" 
                 style={{ boxShadow: '0 0 50px rgba(251, 191, 36, 0.6), inset 0 0 30px rgba(0,0,0,0.3)' }} />
            
            {/* Left Premium Door */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full rounded-l-2xl border-r-4 border-yellow-800 origin-left overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2), 0 0 20px rgba(251, 191, 36, 0.4)'
              }}
              animate={isDoorsOpen ? { rotateY: -120 } : { rotateY: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <div className="absolute inset-6 border-4 border-yellow-300 rounded-xl opacity-60" />
              <div className="absolute top-1/2 right-6 w-6 h-6 bg-yellow-900 rounded-full transform -translate-y-1/2 shadow-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-16 h-16 text-yellow-200 opacity-70" />
              </div>
              {/* Premium shine effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            </motion.div>

            {/* Right Premium Door */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full rounded-r-2xl border-l-4 border-yellow-800 origin-right overflow-hidden"
              style={{
                background: 'linear-gradient(225deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2), 0 0 20px rgba(251, 191, 36, 0.4)'
              }}
              animate={isDoorsOpen ? { rotateY: 120 } : { rotateY: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <div className="absolute inset-6 border-4 border-yellow-300 rounded-xl opacity-60" />
              <div className="absolute top-1/2 left-6 w-6 h-6 bg-yellow-900 rounded-full transform -translate-y-1/2 shadow-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-yellow-200 opacity-70" />
              </div>
              {/* Premium shine effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 via-transparent to-transparent" />
            </motion.div>

            {/* Luxury Inner Glow */}
            <AnimatePresence>
              {isDoorsOpen && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, rgba(147, 51, 234, 0.4) 100%)',
                    filter: 'blur(20px)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Premium Instruction */}
          {!isDoorsOpen && (
            <motion.p
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-yellow-300 text-2xl font-bold"
              style={{ 
                fontFamily: "'Dancing Script', cursive",
                textShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click the luxury doors ✨
            </motion.p>
          )}
        </div>

        {/* Premium Enter Button */}
        <AnimatePresence>
          {showEnterButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.3, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(236, 72, 153, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="px-16 py-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-purple-900 rounded-full shadow-2xl border-4 border-yellow-300 font-bold text-3xl"
              style={{ 
                fontFamily: "'Dancing Script', cursive",
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)'
              }}
            >
              Enter Luxury Experience ✨
            </motion.button>
          )}
        </AnimatePresence>

        {/* Music Control */}
        {!audioStarted && (
          <div className="fixed top-6 right-6 bg-yellow-400/90 text-purple-900 px-6 py-3 rounded-full text-lg font-bold animate-pulse">
            🎵 Click doors for music!
          </div>
        )}
      </div>

      {/* Premium Floating Elements */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            y: -200,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {i % 3 === 0 ? (
            <Heart className="w-8 h-8 text-pink-400 opacity-60" fill="currentColor" />
          ) : i % 3 === 1 ? (
            <Sparkles className="w-8 h-8 text-yellow-400 opacity-60" />
          ) : (
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function PremiumParticleBackground() {
  return (
    <div className="absolute inset-0">
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? '#fbbf24' : '#ec4899',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}