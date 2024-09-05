import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <main className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {children}
      </main>
    </div>
  );
};