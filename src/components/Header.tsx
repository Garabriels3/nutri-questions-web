import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-32 h-32 bg-pink-200 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl animate-bounce">🥑</span>
      </div>
      <h1 className="text-3xl font-bold text-pink-600 text-center">{title}</h1>
      {subtitle && <p className="text-gray-600 text-center mt-2">{subtitle}</p>}
    </div>
  );
};