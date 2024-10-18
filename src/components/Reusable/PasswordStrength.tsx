import React from 'react'

interface PasswordStrengthProps {
  passwordStrength: number;
  passwordStrengthArray: string[];
}

const PasswordStrength = ({passwordStrength, passwordStrengthArray}: PasswordStrengthProps) => {

  const passwordText = ['weak', 'okay', 'good', 'strong', 'very strong']

  return (
    <div>
      <div className='flex flex-row w-full mt-3 mb-1'>
        {passwordStrengthArray.map((level: string, index: number) => 
          <div key={index} className='w-1/5'>
            <div className={`h-2 ${level}`}></div>
          </div>
        )}
      </div>
      <span className='text-sm text-gray-900 dark:text-white'>
        Strength: {passwordText[passwordStrength] || 'empty'}
      </span>
    </div>
  )

}

export default PasswordStrength