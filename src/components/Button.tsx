import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyle = 'w-full font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};