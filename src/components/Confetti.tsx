import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Confetti() {
  const colors = ['#ec4899', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6', '#f43f5e'];
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(100)].map((_, i) => {
        const randomX = Math.random();
        const randomRotate = Math.random() * 720 - 360;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            initial={{
              x: randomX * dimensions.width,
              y: -50,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: dimensions.height + 50,
              rotate: randomRotate,
              opacity: 0,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}
