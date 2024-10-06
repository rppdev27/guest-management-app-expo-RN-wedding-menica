import React, { createContext, useState } from 'react';
import * as Yup from 'yup'; // Import Yup for validation

// Create the AuthContext
export const AuthContext = createContext();

// Define a Yup schema for validating login form (email instead of username)
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address') // Validate email format
    .required('Email is required'), // Make email required
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // State to hold authentication info
  const [errors, setErrors] = useState({}); // State to hold validation errors

  // Dummy static credentials
  const DUMMY_CREDENTIALS = {
    email: 'hello@menica.pro',
    password: 'hellomenicapro',
  };

  // Login function with Yup validation
  const login = async (email, password) => {
  
    try {
      // Validate the input values using Yup schema
      await loginSchema.validate({ email, password }, { abortEarly: false });
      
      // If the credentials match, set authentication
      if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
        setAuth({ email });
        setErrors({}); // Clear errors if authentication succeeds
        return {
          login: true,
        } // Login success
      } else {
        setErrors({ general: 'Invalid email or password' }); // Set general error
        return false;
      }
    } catch (validationErrors) {
      // Catch Yup validation errors and set them in the errors state
      const formattedErrors = {};
      
      validationErrors.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });

      setErrors(formattedErrors);
      return false;

    }
  };

  // Logout function
  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
