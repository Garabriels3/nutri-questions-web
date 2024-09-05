import React, { useEffect, useState } from 'react';

interface TimerProps {
  startTime: number;
}

export const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-pink-100 rounded-full p-3 shadow-md inline-block">
      <div className="text-pink-600 font-bold text-xl">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};