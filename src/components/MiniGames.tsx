import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface MiniGamesProps {
  onComplete: () => void;
}

type GameStage = 'pick-hearts' | 'complete';

const compliments = [
  "You're absolutely amazing! 💖",
  "Your smile brightens everyone's day ✨",
  "You're incredibly special 🌟",
  "So grateful for your friendship 💕",
  'You make everything more fun 🎀',
  "You're one in a million! 💎",
  'Your kindness is inspiring 🌸',
  "You're wonderful in every way! ⭐",
];

export function MiniGames({ onComplete }: MiniGamesProps) {
  const [gameStage, setGameStage] = useState<GameStage>('pick-hearts');
  const [revealedHearts, setRevealedHearts] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const handleHeartClick = (index: number) => {
    if (!revealedHearts.has(index)) {
      setRevealedHearts(prev => new Set([...prev, index]));
      setSelectedCard(index);
    }
  };



  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 overflow-hidden py-20">
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.h2
          className="text-6xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Interactive Surprises 🎮✨
        </motion.h2>

        {/* Pick Hearts Game */}
        <AnimatePresence mode="wait">
          {gameStage === 'pick-hearts' && (
            <motion.div
              key="pick-hearts"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mt-16"
            >
              <motion.p
                className="text-center text-2xl text-pink-200 mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Click the hearts to reveal sweet messages! 💝
              </motion.p>
              
              <motion.p
                className="text-center text-xl text-yellow-300 mb-12"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Then pick the sacred Sampaguita flowers for a special Filipino surprise! 🌸
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {compliments.map((compliment, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <motion.button
                      className="relative w-full aspect-square"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleHeartClick(index)}
                    >
                      {!revealedHearts.has(index) ? (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <Heart 
                            className="w-full h-full text-pink-500 drop-shadow-2xl" 
                            fill="currentColor"
                            style={{
                              filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))'
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl shadow-2xl flex items-center justify-center p-6 border-4 border-yellow-400"
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <p className="text-white text-center text-lg font-bold leading-tight" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {compliment}
                          </p>
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {revealedHearts.size >= 6 && (
                <motion.div
                  className="mt-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <SampaguitaGame onComplete={onComplete} />
                </motion.div>
              )}
            </motion.div>
          )}


        </AnimatePresence>

        {/* Card Modal */}
        <AnimatePresence>
          {selectedCard !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                className="relative max-w-2xl w-full"
                initial={{ scale: 0.5, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: 90 }}
                transition={{ type: 'spring', duration: 0.6 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-10 text-2xl"
                >
                  ×
                </button>

                <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-12 shadow-2xl border-8 border-yellow-400">
                  <Heart className="w-20 h-20 text-white mx-auto mb-8" fill="currentColor" />
                  
                  <h3 className="text-4xl text-white text-center mb-8 font-bold" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                    Sweet Message 💖
                  </h3>
                  
                  <p className="text-3xl text-white text-center leading-relaxed font-bold" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {compliments[selectedCard]}
                  </p>
                </div>

                {/* Floating hearts around modal */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.cos(i * Math.PI / 6) * 60)}%`,
                      y: `${50 + (Math.sin(i * Math.PI / 6) * 60)}%`,
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SampaguitaGame({ onComplete }: { onComplete: () => void }) {
  const [pickedFlowers, setPickedFlowers] = useState<Set<number>>(new Set());
  const [showFilipinoBlessings, setShowFilipinoBlessings] = useState(false);

  const filipinoLoveMessages = [
    "Happy Birthday, Gracia! 🌸",
    "You're an amazing friend 💖",
    "Ikaw ay napaka-ganda 🌍",
    "Beautiful Filipina girl 👑",
    "You bring joy to everyone 🤍",
    "Stay awesome, Gracia! 👸"
  ];

  const handleFlowerPick = (index: number) => {
    setPickedFlowers(prev => new Set([...prev, index]));
    if (pickedFlowers.size >= 5) {
      setTimeout(() => setShowFilipinoBlessings(true), 1000);
    }
  };

  return (
    <div className="relative">
      <motion.h3
        className="text-4xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-300 to-white"
        style={{ fontFamily: "'Dancing Script', cursive" }}
        animate={{
          textShadow: [
            '0 0 20px rgba(255, 255, 255, 0.8)',
            '0 0 40px rgba(251, 191, 36, 0.8)',
            '0 0 20px rgba(255, 255, 255, 0.8)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Sacred Sampaguita Garden 🌸
      </motion.h3>

      <motion.p
        className="text-center text-lg text-pink-200 mb-8"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Pick the blessed sampaguita flowers to unlock Filipino love blessings!
      </motion.p>

      {/* Premium Sampaguita Flowers */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto mb-8">
        {filipinoLoveMessages.map((message, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2, type: 'spring' }}
          >
            <motion.button
              className="relative w-full aspect-square"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFlowerPick(index)}
            >
              {!pickedFlowers.has(index) ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      background: 'radial-gradient(circle, #ffffff 30%, #fbbf24 70%)',
                      boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    🌸
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-white to-yellow-400 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-500"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-purple-900 text-center text-sm font-bold px-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {message}
                  </p>
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Filipino Blessing Modal */}
      <AnimatePresence>
        {showFilipinoBlessings && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-yellow-900/90 via-red-900/90 to-blue-900/90 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-3xl mx-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-blue-400 rounded-3xl blur-2xl opacity-60" />
              
              <div className="relative bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-12 shadow-2xl border-8 border-yellow-500">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🌸🇵🇭🌸</div>
                  <h3 className="text-5xl text-red-800 font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Filipino Blessing Unlocked!
                  </h3>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-red-100 rounded-2xl p-8 mb-8">
                  <p className="text-3xl text-red-900 text-center leading-relaxed font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    "Gracia, you are like the sampaguita flower - pure, beautiful, and bringing joy to everyone around you. 
                    Your friendship is a blessing and your smile lights up any room. 
                    Maligayang kaarawan, amazing Filipina friend! 👑🌸"
                  </p>
                </div>

                <motion.button
                  className="w-full px-12 py-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white rounded-full shadow-2xl border-4 border-yellow-400 font-bold text-2xl"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                >
                  Continue to Grand Finale →
                </motion.button>
              </div>

              {/* Floating sampaguita flowers */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.cos(i * Math.PI / 7.5) * 80)}%`,
                    y: `${50 + (Math.sin(i * Math.PI / 7.5) * 80)}%`,
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  🌸
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

