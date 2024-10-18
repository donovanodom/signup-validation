import React from 'react'

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  isHidden?: boolean;
  value?: string;
  name?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type,
  placeholder,
  isRequired,
  isHidden,
  value,
  name,
  handleChange 
}: InputProps) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        type={type} 
        placeholder={placeholder}
        required={isRequired}
        hidden={isHidden}
        name={name} 
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Input