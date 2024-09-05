import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="mb-6">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-800 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className={option.value === '' ? 'text-gray-600' : 'text-gray-800'}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};