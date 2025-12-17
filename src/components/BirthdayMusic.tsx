import { useEffect, useRef } from 'react';

interface BirthdayMusicProps {
  isPlaying: boolean;
}

export function BirthdayMusic({ isPlaying }: BirthdayMusicProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentNoteRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sweet Happy Birthday melody with rich harmonies (frequencies in Hz)
  const melody = [
    // Gentle intro with arpeggiated chords
    { notes: [262, 330, 392, 523], duration: 300, type: 'intro' }, // C major arpeggio
    { notes: [294, 349, 440, 587], duration: 300, type: 'intro' }, // D minor arpeggio
    { notes: [330, 392, 494, 659], duration: 400, type: 'intro' }, // E minor arpeggio
    { notes: [0, 0, 0, 0], duration: 200 }, // rest
    
    // "Happy Birthday to you" (first line) - sweeter harmonies
    { notes: [262, 330, 392, 523], duration: 400 }, // C4, E4, G4, C5 - Hap-
    { notes: [262, 330, 392, 523], duration: 200 }, // C4, E4, G4, C5 - py
    { notes: [294, 349, 440, 587], duration: 600 }, // D4, F4, A4, D5 - Birth-
    { notes: [262, 330, 392, 523], duration: 600 }, // C4, E4, G4, C5 - day
    { notes: [349, 440, 523, 698], duration: 600 }, // F4, A4, C5, F5 - to
    { notes: [330, 392, 494, 659], duration: 1200 }, // E4, G4, B4, E5 - you
    { notes: [0, 0, 0, 0], duration: 300 }, // rest
    
    // Sweet melodic interlude
    { notes: [392, 494, 587, 784], duration: 200, type: 'ornament' }, // G major chord
    { notes: [349, 440, 523, 698], duration: 200, type: 'ornament' }, // F major chord
    { notes: [330, 415, 494, 659], duration: 300, type: 'ornament' }, // E major chord
    { notes: [0, 0, 0, 0], duration: 200 }, // rest
    
    // "Happy Birthday to you" (second line) - with counter-melody
    { notes: [262, 330, 392, 523], duration: 400 }, // C4, E4, G4, C5 - Hap-
    { notes: [262, 330, 392, 523], duration: 200 }, // C4, E4, G4, C5 - py
    { notes: [294, 349, 440, 587], duration: 600 }, // D4, F4, A4, D5 - Birth-
    { notes: [262, 330, 392, 523], duration: 600 }, // C4, E4, G4, C5 - day
    { notes: [392, 494, 587, 784], duration: 600 }, // G4, B4, D5, G5 - to
    { notes: [349, 440, 523, 698], duration: 1200 }, // F4, A4, C5, F5 - you
    { notes: [0, 0, 0, 0], duration: 300 }, // rest
    
    // Magical transition with ascending notes
    { notes: [262, 330, 392, 523], duration: 150, type: 'transition' },
    { notes: [294, 370, 440, 587], duration: 150, type: 'transition' },
    { notes: [330, 415, 494, 659], duration: 150, type: 'transition' },
    { notes: [370, 466, 554, 740], duration: 150, type: 'transition' },
    { notes: [0, 0, 0, 0], duration: 200 }, // rest
    
    // "Happy Birthday dear Gracia" (third line) - most emotional
    { notes: [262, 330, 392, 523], duration: 400 }, // C4, E4, G4, C5 - Hap-
    { notes: [262, 330, 392, 523], duration: 200 }, // C4, E4, G4, C5 - py
    { notes: [523, 659, 784, 1047], duration: 600 }, // C5, E5, G5, C6 - Birth-
    { notes: [440, 554, 659, 880], duration: 600 }, // A4, C#5, E5, A5 - day
    { notes: [349, 440, 523, 698], duration: 600 }, // F4, A4, C5, F5 - dear
    { notes: [330, 415, 494, 659], duration: 600 }, // E4, G#4, B4, E5 - Gra-
    { notes: [294, 370, 440, 587], duration: 1200 }, // D4, F#4, A4, D5 - cia
    { notes: [0, 0, 0, 0], duration: 400 }, // rest
    
    // Gentle descending ornament
    { notes: [523, 659, 784, 1047], duration: 200, type: 'ornament' },
    { notes: [494, 622, 740, 988], duration: 200, type: 'ornament' },
    { notes: [466, 587, 698, 932], duration: 200, type: 'ornament' },
    { notes: [440, 554, 659, 880], duration: 300, type: 'ornament' },
    { notes: [0, 0, 0, 0], duration: 200 }, // rest
    
    // "Happy Birthday to you" (final line) - grand finale
    { notes: [466, 587, 698, 932], duration: 400 }, // Bb4, D5, F5, Bb5 - Hap-
    { notes: [466, 587, 698, 932], duration: 200 }, // Bb4, D5, F5, Bb5 - py
    { notes: [440, 554, 659, 880], duration: 600 }, // A4, C#5, E5, A5 - Birth-
    { notes: [349, 440, 523, 698], duration: 600 }, // F4, A4, C5, F5 - day
    { notes: [392, 494, 587, 784], duration: 600 }, // G4, B4, D5, G5 - to
    { notes: [349, 440, 523, 698], duration: 1400 }, // F4, A4, C5, F5 - you
    
    // Beautiful outro with cascading notes
    { notes: [523, 659, 784, 1047], duration: 400, type: 'outro' },
    { notes: [440, 554, 659, 880], duration: 400, type: 'outro' },
    { notes: [392, 494, 587, 784], duration: 400, type: 'outro' },
    { notes: [349, 440, 523, 698], duration: 600, type: 'outro' },
    { notes: [262, 330, 392, 523], duration: 1200, type: 'outro' }, // Final C major chord
    { notes: [0, 0, 0, 0], duration: 1000 }, // final rest
  ];

  const playChord = (frequencies: number[], duration: number, startTime: number, noteType?: string) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = startTime;

    frequencies.forEach((freq, index) => {
      if (freq === 0) return; // Skip rests

      // Create multiple oscillators for richer sound
      // Main melody
      const mainOsc = ctx.createOscillator();
      const mainGain = ctx.createGain();
      
      // Enhanced vibrato for more musical expression
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = noteType === 'intro' || noteType === 'outro' ? 3 : 5;
      vibratoGain.gain.value = noteType === 'ornament' ? 3 : 2;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(mainOsc.frequency);

      // Add tremolo for sweetness
      const tremolo = ctx.createOscillator();
      const tremoloGain = ctx.createGain();
      tremolo.frequency.value = 4; // 4 Hz tremolo
      tremoloGain.gain.value = 0.1; // Subtle amplitude modulation
      tremolo.connect(tremoloGain);
      
      mainOsc.connect(mainGain);
      tremoloGain.connect(mainGain.gain);
      mainGain.connect(ctx.destination);

      // Warmer waveform selection based on note type
      if (noteType === 'intro' || noteType === 'outro') {
        mainOsc.type = 'triangle';
      } else if (noteType === 'ornament') {
        mainOsc.type = 'sine';
      } else {
        mainOsc.type = index === 0 ? 'sawtooth' : index === 1 ? 'triangle' : 'sine';
      }
      
      mainOsc.frequency.value = freq;

      // Dynamic volume based on note type
      let volume;
      if (noteType === 'intro' || noteType === 'outro') {
        volume = index === 0 ? 0.25 : 0.12;
      } else if (noteType === 'ornament') {
        volume = 0.18;
      } else if (noteType === 'transition') {
        volume = 0.15;
      } else {
        volume = index === 0 ? 0.4 : index === 1 ? 0.25 : 0.15;
      }

      // Sophisticated envelope shaping
      mainGain.gain.setValueAtTime(0, now);
      
      if (noteType === 'intro' || noteType === 'outro') {
        mainGain.gain.linearRampToValueAtTime(volume, now + 0.05);
        mainGain.gain.setValueAtTime(volume, now + duration / 1000 - 0.2);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
      } else if (noteType === 'ornament') {
        mainGain.gain.linearRampToValueAtTime(volume, now + 0.01);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
      } else {
        mainGain.gain.linearRampToValueAtTime(volume, now + 0.02);
        mainGain.gain.setValueAtTime(volume, now + duration / 1000 - 0.1);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
      }

      tremolo.start(now);
      vibrato.start(now);
      mainOsc.start(now);
      mainOsc.stop(now + duration / 1000);
      vibrato.stop(now + duration / 1000);
      tremolo.stop(now + duration / 1000);

      // Add subtle reverb-like effect with delayed echo
      if (index === 0) {
        const echoOsc = ctx.createOscillator();
        const echoGain = ctx.createGain();
        
        echoOsc.connect(echoGain);
        echoGain.connect(ctx.destination);
        
        echoOsc.type = 'sine';
        echoOsc.frequency.value = freq;
        
        echoGain.gain.setValueAtTime(0, now + 0.05);
        echoGain.gain.linearRampToValueAtTime(0.08, now + 0.07);
        echoGain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000 + 0.15);
        
        echoOsc.start(now + 0.05);
        echoOsc.stop(now + duration / 1000 + 0.15);
      }
    });

    // Add bass note for richness
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    
    bass.type = 'sine';
    bass.frequency.value = frequencies[0] / 2; // One octave lower
    
    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.12, now + 0.03);
    bassGain.gain.setValueAtTime(0.12, now + duration / 1000 - 0.1);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
    
    bass.start(now);
    bass.stop(now + duration / 1000);
  };

  const playMelody = () => {
    if (!audioContextRef.current || !isPlaying) return;

    if (currentNoteRef.current >= melody.length) {
      currentNoteRef.current = 0; // Loop back to start
      // Add a longer pause before repeating
      timeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          playMelody();
        }
      }, 2000);
      return;
    }

    const note = melody[currentNoteRef.current];
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    playChord(note.notes, note.duration, now, note.type);

    currentNoteRef.current++;

    // Schedule next note with slight gap
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        playMelody();
      }
    }, note.duration + 50);
  };

  useEffect(() => {
    if (isPlaying) {
      // Initialize audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Resume context if suspended (browser autoplay policy)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      currentNoteRef.current = 0;
      playMelody();
    } else {
      // Stop playing
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying]);

  return null; // This component doesn't render anything
}
