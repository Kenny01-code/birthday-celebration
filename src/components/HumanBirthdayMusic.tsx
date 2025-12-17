import { useEffect, useRef, useState } from 'react';

interface HumanBirthdayMusicProps {
  isPlaying: boolean;
}

export function HumanBirthdayMusic({ isPlaying }: HumanBirthdayMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startAudio = () => {
    if (audioRef.current && !hasStarted) {
      audioRef.current.play().catch(console.error);
      setHasStarted(true);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying && hasStarted) {
      audioRef.current.play().catch(console.error);
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, hasStarted]);

  useEffect(() => {
    document.addEventListener('click', startAudio, { once: true });
    return () => document.removeEventListener('click', startAudio);
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    />
  );
}