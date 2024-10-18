export const validateSignUpParams = (params: SignUpParams, passwordStrength: number): SignUpErrors => {
  const errors: SignUpErrors = {
    firstName: [],
    lastName: [],
    username: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  } 

  Object.keys(params).forEach((key) => {
    switch(key) {
      case 'firstName':
        const firstNameErrors = validateName(params.firstName, 'First Name')
        errors.firstName = firstNameErrors
      case 'lastName':
        const lastNameErrors = validateName(params.lastName, 'Last Name')
        errors.lastName = lastNameErrors
      case 'username':
        const usernameErrors = validateUsername(params.username)
        errors.username = usernameErrors
      case 'email':
        const emailErrors = validateEmail(params.email)
        errors.email = emailErrors
      case 'password':
        const passwordErrors = validatePassword(params.password, passwordStrength)
        errors.password = passwordErrors
      case 'passwordConfirmation':
        const passwordConfirmationErrors = validatePasswordConfirmation(params.passwordConfirmation, params.password)
        errors.passwordConfirmation = passwordConfirmationErrors
    }
  })
  return errors
}

export const isValidSignUpParams = (errors: SignUpErrors) => {
  let valid = true
  Object.keys(errors).forEach((key) => {
    if(errors[key as keyof SignUpErrors].length) valid = false
  })
  return valid
}

const validateName = (value: string, type: string) => {
  const errors: string[] = []
  if(value.length === 0){
    errors.push(`${type} can't be blank`)
    return errors
  }
  if(/^[a-zA-Z]+$/.test(value) === false) errors.push(`${type} can only be letters`)
  if(value.length < 2) errors.push(`${type} is too short (minimum is 2 characters)`)
  if(value.length > 50) errors.push(`${type} is too long (maximum is 50 characters)`)
  if(/\s/.test(value)) errors.push(`${type} must not have any blank spaces`)
  return errors
}

const validateUsername = (value: string) => {
  const errors: string[] = []
  if(value.length === 0){
    errors.push(`Username can't be blank`)
    return errors
  }
  if(/^[a-zA-Z0-9_]*$/.test(value) === false) errors.push(`Username can only be letters, numbers or underscores`)
  if(value.length < 3) errors.push(`Username is too short (minimum is 3 characters)`)
  if(value.length > 15) errors.push(`Username is too long (maximum is 15 characters)`)
  if(/\s/.test(value)) errors.push(`Username must not have any blank spaces`)
  return errors
}

const validateEmail = (value: string) => {
  const errors: string[] = []
  if(value.length === 0){
    errors.push(`Email can't be blank`)
    return errors
  }
  if(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value) === false) errors.push(`Email ${value} is not a valid email address`)
  if(/\s/.test(value)) errors.push(`Email must not have any blank spaces`)
  return errors
}

const validatePassword = (value: string, passwordStrength: number) => {
  const errors: string[] = []
  if(value.length === 0){
    errors.push(`Password can't be blank`)
    return errors
  }
  if(passwordStrength < 3) errors.push('Password not strong enough')
  if(value.length < 10) errors.push(`Password is too short (minimum is 10 characters)`)
  if(value.length > 30) errors.push(`Password is too long (maximum is 30 characters)`)
  if(/[A-Z]+/.test(value) === false) errors.push('Password must contain at least one capital letter')
  if(/[a-z]+/.test(value) === false) errors.push('Password must contain at least one lowercase letter')
  if(/\d+/.test(value) === false) errors.push('Password must contain at least one number')
  if(/^[0-9A-Za-z$@!_-]*$/.test(value) === false) errors.push("Password can only have '$', '@', '!', '_', or '-' as special characters")
  if(/\s/.test(value)) errors.push(`Password must not have any blank spaces`)
  return errors
}

const validatePasswordConfirmation = (value: string, compare: string) => {
  const errors: string[] = []
  if(value.length === 0){
    errors.push(`Password Confirmation can't be blank`)
    return errors
  }
  if(value !== compare) errors.push("Password Confirmation doesn't match")
  return errors
}