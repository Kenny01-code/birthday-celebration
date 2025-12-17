import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Music, Sparkles, Star } from 'lucide-react';
import { Confetti } from './Confetti';
import { BirthdayMusic } from './BirthdayMusic';

export function GrandFinale() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hiddenMessagesFound, setHiddenMessagesFound] = useState<Set<number>>(new Set());
  const [playMusic, setPlayMusic] = useState(false);

  const balloons = [
    { id: 1, color: 'from-pink-400 to-pink-600', x: '10%', delay: 0 },
    { id: 2, color: 'from-purple-400 to-purple-600', x: '25%', delay: 0.2 },
    { id: 3, color: 'from-yellow-400 to-yellow-600', x: '40%', delay: 0.4 },
    { id: 4, color: 'from-red-400 to-red-600', x: '55%', delay: 0.6 },
    { id: 5, color: 'from-blue-400 to-blue-600', x: '70%', delay: 0.8 },
    { id: 6, color: 'from-green-400 to-green-600', x: '85%', delay: 1.0 },
  ];

  const hiddenMessages = [
    { id: 1, message: "You're like sunshine ☀️", icon: Star },
    { id: 2, message: 'So grateful for your friendship 💫', icon: Sparkles },
    { id: 3, message: 'You make life brighter 💝', icon: Heart },
  ];

  const handleBalloonClick = (id: number) => {
    setBalloonsPoppedCount(prev => {
      const newCount = prev + 1;
      if (newCount === 1) {
        // Show video immediately after first balloon click
        setShowVideo(true);
      }
      return newCount;
    });
  };

  const [showVideo, setShowVideo] = useState(false);

  const handleHiddenMessageClick = (id: number) => {
    setHiddenMessagesFound(prev => new Set([...prev, id]));
  };

  useEffect(() => {
    if (hiddenMessagesFound.size === 3) {
      setTimeout(() => setShowEasterEgg(true), 1000);
    }
  }, [hiddenMessagesFound]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{
      background: `
        conic-gradient(from 0deg at 50% 50%, #000000 0deg, #1a0033 60deg, #330066 120deg, #4d0080 180deg, #660099 240deg, #8000b3 300deg, #000000 360deg),
        radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 10%, rgba(255, 20, 147, 0.1) 0%, transparent 30%),
        linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.03) 50%, transparent 70%),
        linear-gradient(-45deg, transparent 30%, rgba(138, 43, 226, 0.03) 50%, transparent 70%)
      `,
      backgroundSize: '100% 100%, 800px 800px, 600px 600px, 400px 400px, 200px 200px, 200px 200px',
      animation: 'luxuryShift 20s ease-in-out infinite'
    }}>
      <style>{`
        @keyframes luxuryShift {
          0%, 100% { filter: hue-rotate(0deg) brightness(1) contrast(1.2); }
          25% { filter: hue-rotate(10deg) brightness(1.1) contrast(1.3); }
          50% { filter: hue-rotate(-5deg) brightness(0.95) contrast(1.4); }
          75% { filter: hue-rotate(15deg) brightness(1.05) contrast(1.2); }
        }
        .luxury-text {
          background: linear-gradient(45deg, #ffd700, #ffed4e, #fff700, #ffd700);
          background-size: 400% 400%;
          animation: luxuryGlow 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
        }
        @media (min-width: 768px) {
          .luxury-text {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.4));
          }
        }
        @keyframes luxuryGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .diamond-border {
          position: relative;
          background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
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
      `}</style>
      {/* Surprise Video Background */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.5, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
              src="/graciavideo.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />
            
            {/* Video overlay text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-3xl p-8 border-4 border-yellow-400/50">
                <motion.h2
                  className="text-6xl luxury-text font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  HAPPY BIRTHDAY GRACIA!
                </motion.h2>
                <motion.p
                  className="text-3xl text-white font-light"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  You are absolutely wonderful! 🎉💖
                </motion.p>
              </div>
            </motion.div>
            
            {/* Anime sparkle effects */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {showConfetti && <Confetti />}
      <BirthdayMusic isPlaying={playMusic} />

      {/* Velvet texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Golden sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
          }}
          animate={{
            y: -50,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-20">
        {/* Main message */}
        <motion.div
          className="text-center mb-20 max-w-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: showVideo ? 0 : 1, 
            y: showVideo ? -100 : 0,
            scale: showVideo ? 0.8 : 1
          }}
          transition={{ duration: showVideo ? 0.8 : 1 }}
        >
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Heart className="w-24 h-24 text-pink-400 mx-auto mb-6" fill="currentColor" />
          </motion.div>

          <motion.h1
            className="text-8xl mb-12 luxury-text font-bold tracking-wider"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4), 0 0 90px rgba(255, 215, 0, 0.2)'
            }}
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)',
                '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.6)',
                '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            GRACIA
          </motion.h1>
          
          <motion.div
            className="diamond-border rounded-3xl p-8 mb-12 velvet-texture backdrop-blur-md"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <motion.h2
              className="text-5xl text-white font-light tracking-widest mb-4"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}
            >
              ABSOLUTELY WONDERFUL
            </motion.h2>
          </motion.div>

          <motion.div
            className="diamond-border rounded-2xl p-10 mb-8 velvet-texture backdrop-blur-sm"
            style={{ background: 'rgba(255, 215, 0, 0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-4xl text-white font-medium tracking-wide leading-relaxed"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}
            >
              You bring so much joy to everyone 💖
            </motion.p>
          </motion.div>

          <motion.div
            className="diamond-border rounded-2xl p-10 velvet-texture backdrop-blur-sm"
            style={{ background: 'rgba(138, 43, 226, 0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-3xl text-white font-light tracking-wide leading-relaxed"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}
            >
              May your 17th birthday be filled with endless joy, laughter, and all the beautiful moments you deserve ✨
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating Balloons */}
        <div className="relative w-full max-w-6xl h-96 mb-20">
          {balloons.map((balloon) => (
            <FloatingBalloon
              key={balloon.id}
              {...balloon}
              onClick={() => handleBalloonClick(balloon.id)}
            />
          ))}
          
          <motion.p
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xl text-pink-200 text-center whitespace-nowrap"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click the balloons for little surprises! 🎈
          </motion.p>
        </div>

        {/* Hidden messages scattered */}
        <div className="relative w-full max-w-4xl h-40 mb-12">
          {hiddenMessages.map((item, index) => (
            <motion.button
              key={item.id}
              className="absolute"
              style={{
                left: `${20 + index * 30}%`,
                top: `${Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.3 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              onClick={() => handleHiddenMessageClick(item.id)}
            >
              {!hiddenMessagesFound.has(item.id) ? (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <item.icon className="w-12 h-12 text-yellow-400" fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-2xl border-2 border-yellow-400"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-purple-900 text-center text-2xl font-bold px-4 py-2" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '0 4px 8px rgba(255,255,255,0.9)' }}>
                    {item.message}
                  </p>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Special Easter Egg */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-purple-900/95 backdrop-blur-md z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative max-w-2xl mx-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-50" />
                
                <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl p-12 shadow-2xl border-8 border-yellow-400">
                  <Gift className="w-20 h-20 text-purple-600 mx-auto mb-6" />
                  
                  <h3 className="text-5xl text-purple-900 text-center mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    You found the secret! 🎁
                  </h3>
                  
                  <p className="text-4xl text-purple-800 text-center mb-8 font-bold leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '0 4px 8px rgba(255,255,255,0.9)' }}>
                    "Hope this birthday celebration brings you lots of joy and happiness! 
                    Wishing you an amazing year ahead filled with wonderful surprises! 💝"
                  </p>

                  <motion.div
                    className="text-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="w-16 h-16 text-yellow-500 mx-auto" />
                  </motion.div>
                </div>

                <motion.button
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-purple-900 text-white rounded-full text-xl"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEasterEgg(false)}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music toggle button */}
        <motion.button
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-purple-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPlayMusic(!playMusic)}
          animate={{
            boxShadow: playMusic 
              ? ['0 0 20px rgba(255, 215, 0, 0.5)', '0 0 40px rgba(255, 215, 0, 0.8)', '0 0 20px rgba(255, 215, 0, 0.5)']
              : '0 0 20px rgba(255, 215, 0, 0.5)'
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 text-purple-900" fill="currentColor" />
        </motion.button>

        {playMusic && (
          <motion.div
            className="fixed bottom-28 right-8 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-purple-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
              🎵 Playing: Happy Birthday Melody
            </p>
          </motion.div>
        )}

        {/* Final decorative elements */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p className="text-2xl text-yellow-200 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            This is just the beginning of celebrating you...
          </p>
          <p className="text-3xl text-pink-300" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Happy Birthday, Beautiful! 🎂🎉💖
          </p>
        </motion.div>
      </div>
    </div>
  );
}

interface FloatingBalloonProps {
  id: number;
  color: string;
  x: string;
  delay: number;
  onClick: () => void;
}

function FloatingBalloon({ id, color, x, delay, onClick }: FloatingBalloonProps) {
  const [isPopped, setIsPopped] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const handleClick = () => {
    setIsPopped(true);
    setShowSparkle(true);
    onClick();
    setTimeout(() => setShowSparkle(false), 1000);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, bottom: 0 }}
      initial={{ y: 100, opacity: 0 }}
      animate={isPopped ? { y: -50, opacity: 0, scale: 0 } : { 
        y: [-20, -40, -20],
        opacity: 1,
        x: [0, 10, 0, -10, 0]
      }}
      transition={isPopped ? { duration: 0.5 } : {
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        opacity: { delay, duration: 0.5 }
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
    >
      {!isPopped && (
        <>
          {/* Balloon */}
          <div className={`relative w-24 h-32 bg-gradient-to-br ${color} rounded-full`}>
            {/* Shine effect */}
            <div className="absolute top-4 left-4 w-8 h-12 bg-white/40 rounded-full blur-sm" />
            {/* Balloon knot */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-b from-current to-transparent opacity-70 rounded-full" />
          </div>
          {/* String */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gray-400" />
        </>
      )}

      {/* Pop sparkle */}
      <AnimatePresence>
        {showSparkle && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 2,
                  x: Math.cos(i * 30 * Math.PI / 180) * 100,
                  y: Math.sin(i * 30 * Math.PI / 180) * 100,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}