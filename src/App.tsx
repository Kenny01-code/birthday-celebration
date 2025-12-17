import { useState, useEffect, useRef } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { InteractiveGiftBox } from './components/InteractiveGiftBox';
import { MemoryLane } from './components/MemoryLane';
import { MiniGames } from './components/MiniGames';
import { GrandFinale } from './components/GrandFinale';
import { FriendshipMemoryBook } from './components/FriendshipMemoryBook';
import { FriendContributions } from './components/FriendContributions';
import { InteractiveBirthdayCake } from './components/InteractiveBirthdayCake';


type Stage = 'landing' | 'giftBox' | 'memories' | 'games' | 'friendship' | 'friendContributions' | 'birthdayCake' | 'finale';

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('landing');
  const globalMusicRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const startGlobalMusic = async () => {
    if (!musicStarted && globalMusicRef.current) {
      try {
        globalMusicRef.current.volume = 0.8;
        await globalMusicRef.current.play();
        setMusicStarted(true);
      } catch (error) {
        console.log('Music needs user interaction');
      }
    }
  };


  return (
    <div className="relative w-full min-h-screen overflow-hidden">


      {currentStage === 'landing' && (
        <LandingScreen onEnter={() => setCurrentStage('giftBox')} onMusicStart={startGlobalMusic} />
      )}
      
      {/* Global birthday music */}
      <audio ref={globalMusicRef} loop preload="auto">
        <source src="/happy-birthday-celebration-happy-birthday-to-you-363137.mp3" type="audio/mpeg" />
      </audio>
      {currentStage === 'giftBox' && (
        <InteractiveGiftBox onComplete={() => setCurrentStage('memories')} />
      )}
      {currentStage === 'memories' && (
        <MemoryLane onContinue={() => setCurrentStage('games')} />
      )}
      {currentStage === 'games' && (
        <MiniGames onComplete={() => setCurrentStage('friendship')} />
      )}
      {currentStage === 'friendship' && (
        <FriendshipMemoryBook onComplete={() => setCurrentStage('friendContributions')} />
      )}
      {currentStage === 'friendContributions' && (
        <FriendContributions onComplete={() => setCurrentStage('birthdayCake')} />
      )}
      {currentStage === 'birthdayCake' && (
        <InteractiveBirthdayCake onComplete={() => setCurrentStage('finale')} />
      )}
      {currentStage === 'finale' && (
        <GrandFinale />
      )}
    </div>
  );
}
