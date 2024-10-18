'use client'
import React, { useState, useEffect } from 'react'
import Input from '../components/Reusable/Input';
import Errors from '../components/Reusable/Errors'
import PasswordStrength from '../components/Reusable/PasswordStrength'
import { validateSignUpParams, isValidSignUpParams } from '../utils/validation'
import zxcvbn from 'zxcvbn';

const SignUp = () => {

  const [inputs, setInputs] = useState<SignUpParams>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState<SignUpErrors>({
    firstName: [],
    lastName: [],
    username: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  })

  const [passwordStrength, setPasswordStrength] = useState<number>(-1)
  const [passwordStrengthArray, setPasswordStrengthArray] = useState<string[]>(Array(5).fill('bg-gray-200'))
  const [validationPass, setValidationPass] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrors(validateSignUpParams(inputs, passwordStrength))
    if(isValidSignUpParams(errors)){
      setValidationPass(true)
    }
  }
  
  useEffect(() => {
    if(inputs.password){
      const { score } = zxcvbn(inputs.password)
      setPasswordStrength(() => score)
    }else{
      setPasswordStrength(-1)
    }
  }, [inputs.password])

  useEffect(() => {
    if(passwordStrength === 4 || passwordStrength === 3) {
      const colorArray = createNewColors('bg-green-500', passwordStrength)
      setPasswordStrengthArray(colorArray)
    } else if (passwordStrength === 2) {
      const colorArray = createNewColors('bg-yellow-400', passwordStrength)
      setPasswordStrengthArray(colorArray)
    } else {
      const colorArray = createNewColors('bg-red-400', passwordStrength)
      setPasswordStrengthArray(colorArray)
    }
  }, [passwordStrength])

  const createNewColors = (color: string, strength: number): string[] => {
    const newColors = Array(5).fill('bg-gray-200').map((level: string, index: number) => {
      let levelClass = level
      if(index <= strength) levelClass = color
      return levelClass
    })
    return newColors
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-8 lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        { validationPass ? 
        <div onClick={() => setValidationPass(false)} className="w-full bg-green-600 text-primary-content hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Success! Click to try again</div> : 
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up
          </h1>
          <form autoComplete='off' className="space-y-4 md:space-y-6">
            <div>
              <Input
                label='First Name'
                type='text' 
                isRequired 
                name='firstName'
                value={inputs.firstName}
                handleChange={handleChange}
              />
              {errors.firstName.length ?
                <Errors errors={errors.firstName} /> : 
                null
              }
            </div>
            <div>
              <Input
                label='Last Name'
                type='text' 
                isRequired 
                name='lastName' 
                value={inputs.lastName}
                handleChange={handleChange}
              />
              {errors.lastName.length ?
                <Errors errors={errors.lastName} /> : 
                null
              }
            </div>
            <div>
              <Input
                label='Username'
                type='text'
                isRequired 
                name='username' 
                value={inputs.username}
                handleChange={handleChange}
              />
              {errors.username.length ?
                <Errors errors={errors.username} /> : 
                null
              }
            </div>
            <div>
              <Input
                label='Email'
                type='email' 
                placeholder="user@email.com"
                isRequired 
                name='email'
                value={inputs.email}
                handleChange={handleChange}
              />
              {errors.email.length ?
                <Errors errors={errors.email} /> : 
                null
              }
            </div>
            <div>
              <Input
                label='Password'
                type='password' 
                placeholder="••••••••"
                isRequired 
                isHidden
                name='password'
                value={inputs.password}
                handleChange={handleChange}
              />
              <PasswordStrength
                passwordStrength={passwordStrength}
                passwordStrengthArray={passwordStrengthArray}
              />
              {errors.password.length ?
                <Errors errors={errors.password} /> : 
                null
              }
            </div>
            <div>
              <Input
                label='Password Confirmation'
                type='password' 
                placeholder="••••••••"
                isRequired 
                isHidden
                name='passwordConfirmation'
                value={inputs.passwordConfirmation}
                handleChange={handleChange}
              />
              {errors.passwordConfirmation.length ?
                <Errors errors={errors.passwordConfirmation} /> : 
                null
              }
            </div>
            <button onClick={handleSubmit} type="submit" className="w-full bg-primary text-primary-content hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Have an account? <a href='/' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
            </p>
          </form>
        </div> }
      </div>
    </div>
  )
}

export default SignUp