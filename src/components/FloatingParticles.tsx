import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingParticles() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {[...Array(50)].map((_, i) => {
        const randomX = Math.random();
        const randomY = Math.random();
        const randomTargetY = Math.random();
        const randomTargetX = Math.random();
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{
              x: randomX * dimensions.width,
              y: randomY * dimensions.height,
              opacity: 0,
            }}
            animate={{
              y: [null, randomTargetY * dimensions.height],
              x: [null, randomTargetX * dimensions.width],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </>
  );
}
