import React from 'react';

interface AnimationProps {
  show: boolean;
}

export const Fireworks: React.FC<AnimationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fireworks">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="firework"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export const Trombone: React.FC<AnimationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="trombone">
      <div className="note">♪</div>
      <div className="note">♫</div>
      <div className="note">♩</div>
    </div>
  );
};