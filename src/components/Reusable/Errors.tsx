import React from 'react'

interface ErrorsProps {
  errors: string[];
}

const Errors = ({errors}: ErrorsProps) => {
  return (
    <ul className="px-2 py-[2px] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-inherit dark:text-red-400" role="alert">
    {errors.map((error, index) => 
      <li key={index} className="font-medium">{error}</li>
    )}
    </ul>
  )
}

export default Errors