import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface MemoryLaneProps {
  onContinue: () => void;
}

interface Memory {
  id: number;
  image: string;
  caption: string;
  date: string;
  note: string;
}

const memories: Memory[] = [
  {
    id: 1,
    image: '/graciaiph.jpg',
    caption: 'Beautiful Gracia',
    date: 'A wonderful friend',
    note: "Your smile lights up every room you enter. You're absolutely amazing, Gracia! ✨"
  },
  {
    id: 2,
    image: '/gracia1.jpg',
    caption: 'Sweet Moments',
    date: 'Precious memories',
    note: "Every moment with you brings such joy and laughter to my life. Your friendship means the world! 💕"
  },
  {
    id: 3,
    image: '/gracia2.jpg',
    caption: 'Cherished Times',
    date: 'Forever grateful',
    note: "The memories we create together are treasures I will always cherish. Happy Birthday, dear friend! 🎉"
  }
];

export function MemoryLane({ onContinue }: MemoryLaneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleCardClick = (memory: Memory, event: React.MouseEvent) => {
    setSelectedMemory(memory);
    
    // Add heart animation at click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newHeart = { id: Date.now(), x, y };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 overflow-hidden py-20">
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-6xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Memory Lane 💕
        </motion.h2>

        <motion.p
          className="text-center text-pink-200 text-xl mb-16"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Click any memory to see it up close ✨
        </motion.p>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-8 perspective-1000">
            {/* Previous cards preview */}
            <motion.div
              className="hidden md:block opacity-40 transform scale-75"
              onClick={handlePrev}
            >
              <MemoryCard 
                memory={memories[(currentIndex - 1 + memories.length) % memories.length]} 
                onCardClick={() => {}}
                preview
              />
            </motion.div>

            {/* Current card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative"
            >
              <MemoryCard 
                memory={memories[currentIndex]} 
                onCardClick={handleCardClick}
                hearts={hearts}
              />
            </motion.div>

            {/* Next cards preview */}
            <motion.div
              className="hidden md:block opacity-40 transform scale-75"
              onClick={handleNext}
            >
              <MemoryCard 
                memory={memories[(currentIndex + 1) % memories.length]} 
                onCardClick={() => {}}
                preview
              />
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border-2 border-yellow-400/50"
          >
            <ChevronLeft className="w-8 h-8 text-yellow-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border-2 border-yellow-400/50"
          >
            <ChevronRight className="w-8 h-8 text-yellow-300" />
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-12 bg-yellow-400' 
                  : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-12 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 text-purple-900 rounded-full shadow-2xl border-2 border-yellow-300"
          >
            <span className="text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Continue the Journey →
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Zoomed memory modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
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
                onClick={() => setSelectedMemory(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6 text-purple-900" />
              </button>

              <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl overflow-hidden shadow-2xl border-8 border-yellow-400">
                <div className="relative h-80 overflow-hidden flex items-center justify-center">
                  <ImageWithFallback
                    src={selectedMemory.image}
                    alt={selectedMemory.caption}
                    className="max-w-full max-h-full object-contain bg-black"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-4xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      {selectedMemory.caption}
                    </p>
                    <p className="text-xl opacity-90">
                      {selectedMemory.date}
                    </p>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50">
                  <p className="text-2xl text-purple-900 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {selectedMemory.note}
                  </p>
                </div>
              </div>

              {/* Floating hearts around zoomed image */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.cos(i * Math.PI / 4) * 40)}%`,
                    y: `${50 + (Math.sin(i * Math.PI / 4) * 40)}%`,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MemoryCardProps {
  memory: Memory;
  onCardClick: (memory: Memory, event: React.MouseEvent) => void;
  preview?: boolean;
  hearts?: Array<{ id: number; x: number; y: number }>;
}

function MemoryCard({ memory, onCardClick, preview, hearts = [] }: MemoryCardProps) {
  return (
    <motion.div
      className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 ${
        preview ? 'cursor-pointer w-64' : 'cursor-pointer w-80'
      }`}
      whileHover={!preview ? { scale: 1.05, rotateZ: 2 } : {}}
      onClick={(e) => !preview && onCardClick(memory, e)}
    >
      <div className={`relative ${preview ? 'h-80' : 'h-96'} overflow-hidden`}>
        <ImageWithFallback
          src={memory.image}
          alt={memory.caption}
          className="w-full h-full object-contain bg-gradient-to-br from-purple-100 to-pink-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Polaroid-style caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-2xl mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {memory.caption}
          </p>
          <p className="text-sm opacity-80">
            {memory.date}
          </p>
        </div>

        {/* Heart icon indicator */}
        <div className="absolute top-4 right-4">
          <Heart className="w-8 h-8 text-white drop-shadow-lg" fill="rgba(255,255,255,0.3)" />
        </div>
      </div>

      {/* Click hearts animation */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ left: heart.x, top: heart.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
        >
          <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
        </motion.div>
      ))}

      {/* Handwritten note on white space */}
      <div className="p-6 bg-white">
        <p className="text-lg text-purple-900 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
          {memory.note}
        </p>
      </div>
    </motion.div>
  );
}