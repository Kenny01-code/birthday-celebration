import { motion } from 'motion/react';

export function BirthdayCakeAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
          }}
          animate={{
            y: -200,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          🎂
        </motion.div>
      ))}
      
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`candle-${i}`}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: 0.5,
          }}
          animate={{
            y: -150,
            scale: 1.2,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        >
          🕯️
        </motion.div>
      ))}
    </div>
  );
}