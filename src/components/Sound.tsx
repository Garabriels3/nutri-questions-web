import React, { useEffect, useRef } from 'react';

interface SoundProps {
  play: boolean;
}

export const Sound: React.FC<SoundProps> = ({ play }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (play) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const context = audioContextRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Notas C5, E5, G5, C6 (arpejo de C maior)
      const duration = 0.1; // Duração de cada nota

      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * duration);

        gainNode.gain.setValueAtTime(0, context.currentTime + index * duration);
        gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + index * duration + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + (index + 1) * duration);

        oscillator.start(context.currentTime + index * duration);
        oscillator.stop(context.currentTime + (index + 1) * duration);
      });
    }
  }, [play]);

  return null;
};