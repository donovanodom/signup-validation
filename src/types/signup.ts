type SignUpParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type SignUpErrors = {
  firstName: string[];
  lastName: string[];
  username: string[];
  email: string[];
  password: string[];
  passwordConfirmation: string[];
}