import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles, Gift, Camera, Music } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface FriendshipMemoryBookProps {
  onComplete: () => void;
}

const friendshipMemories = [
  {
    id: 1,
    title: "Our First Meeting",
    memory: "The day we became friends was truly special. Your warm smile and kind heart made me feel so welcome!",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  },
  {
    id: 2,
    title: "Shared Laughter",
    memory: "All those times we laughed together until our stomachs hurt. Your sense of humor always brightens my day!",
    icon: Sparkles,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 3,
    title: "Supporting Each Other",
    memory: "Through good times and challenges, you've always been there. Your friendship means the world to me!",
    icon: Star,
    color: "from-purple-400 to-indigo-500"
  },
  {
    id: 4,
    title: "Fun Adventures",
    memory: "Every moment we spend together becomes a treasured memory. You make ordinary days extraordinary!",
    icon: Camera,
    color: "from-green-400 to-teal-500"
  },
  {
    id: 5,
    title: "Your Amazing Qualities",
    memory: "Your kindness, intelligence, and beautiful spirit inspire everyone around you. You're truly one of a kind!",
    icon: Gift,
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 6,
    title: "Future Friendship",
    memory: "I hope our friendship continues to grow stronger. Here's to many more years of amazing memories together!",
    icon: Heart,
    color: "from-red-400 to-pink-500"
  }
];

export function FriendshipMemoryBook({ onComplete }: FriendshipMemoryBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [completedPages, setCompletedPages] = useState<Set<number>>(new Set());
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handlePageComplete = (pageId: number) => {
    setCompletedPages(prev => {
      const newSet = new Set([...prev, pageId]);
      if (newSet.size === friendshipMemories.length) {
        setTimeout(() => setShowFinalMessage(true), 1000);
      }
      return newSet;
    });
  };

  const nextPage = () => {
    if (currentPage < friendshipMemories.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden py-20" style={{
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
      `
    }}>
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.h2
          className="text-6xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Friendship Memory Book 📖✨
        </motion.h2>

        <motion.p
          className="text-center text-3xl text-white mb-12 font-bold bg-black/30 backdrop-blur-sm rounded-2xl py-4 px-8 mx-auto max-w-4xl border border-yellow-400/50"
          style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click through the pages to read about our amazing friendship!
        </motion.p>

        {/* Memory Book */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-3xl shadow-2xl border-8 border-yellow-600 p-12 min-h-[500px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
            animate={{ rotateY: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className={`w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br ${friendshipMemories[currentPage].color} flex items-center justify-center shadow-2xl`}>
                  {(() => {
                    const IconComponent = friendshipMemories[currentPage].icon;
                    return <IconComponent className="w-12 h-12 text-white" />;
                  })()}
                </div>

                <h3 className="text-4xl text-purple-900 mb-8 font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {friendshipMemories[currentPage].title}
                </h3>

                <div className="bg-white/80 rounded-2xl p-8 shadow-lg border-4 border-yellow-400 mb-8">
                  <p className="text-2xl text-purple-800 leading-relaxed font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {friendshipMemories[currentPage].memory}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageComplete(friendshipMemories[currentPage].id)}
                  className={`px-8 py-4 rounded-full shadow-xl border-4 border-yellow-400 font-bold text-xl ${
                    completedPages.has(friendshipMemories[currentPage].id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                  }`}
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  disabled={completedPages.has(friendshipMemories[currentPage].id)}
                >
                  {completedPages.has(friendshipMemories[currentPage].id) ? '💖 Memory Saved!' : '💝 Save This Memory'}
                </motion.button>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`px-6 py-3 rounded-full font-bold ${
                  currentPage === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'
                }`}
              >
                ← Previous
              </motion.button>

              <div className="text-purple-900 font-bold text-xl">
                Page {currentPage + 1} of {friendshipMemories.length}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                disabled={currentPage === friendshipMemories.length - 1}
                className={`px-6 py-3 rounded-full font-bold ${
                  currentPage === friendshipMemories.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg'
                }`}
              >
                Next →
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-pink-400 to-purple-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedPages.size / friendshipMemories.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-center text-purple-700 mt-2 font-bold">
                {completedPages.size} of {friendshipMemories.length} memories saved
              </p>
            </div>
          </motion.div>
        </div>

        {/* Final Friendship Message */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-pink-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-md z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative max-w-4xl mx-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 rounded-3xl blur-2xl opacity-60" />
                
                <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl p-12 shadow-2xl border-8 border-yellow-500">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">💖👫💖</div>
                    <h3 className="text-5xl text-purple-800 font-bold mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      Friendship Celebration Complete!
                    </h3>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-10 mb-8 shadow-xl border-4 border-yellow-400">
                    <p className="text-4xl text-purple-900 text-center leading-relaxed font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      "Gracia, thank you for being such an amazing friend! Your friendship is one of the most precious gifts in my life. 
                      I hope this birthday celebration shows you just how much you mean to me and everyone who knows you. 
                      Here's to many more years of incredible friendship! 🌟💝"
                    </p>
                  </div>

                  <div className="flex justify-center mt-12 relative z-50">
                    <motion.button
                      className="px-16 py-6 bg-yellow-400 text-purple-900 rounded-full shadow-2xl border-4 border-purple-600 font-bold text-3xl relative z-50"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 1)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onComplete}
                    >
                      Continue to Grand Finale →
                    </motion.button>
                  </div>
                </div>

                {/* Floating friendship symbols */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.cos(i * Math.PI / 10) * 100)}%`,
                      y: `${50 + (Math.sin(i * Math.PI / 10) * 100)}%`,
                      opacity: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    {i % 4 === 0 ? '💖' : i % 4 === 1 ? '👫' : i % 4 === 2 ? '🌟' : '💝'}
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