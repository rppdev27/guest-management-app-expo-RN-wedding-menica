import React, { createContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Create the AuthContext
export const AuthContext = createContext();

// Define a Yup schema for validating login form
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setAuth({ token });
    }
  };

  const login = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        // Validate the input values using Yup schema
        await loginSchema.validate({ email, password }, { abortEarly: false });
        
        // Make API call to /signin endpoint
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        return response.data;
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          // Handle Yup validation errors
          const formattedErrors = {};
          error.inner.forEach((err) => {
            formattedErrors[err.path] = err.message;
          });
          setErrors(formattedErrors);
          throw new Error('Validation failed');
        }
        // Handle API errors
        if (axios.isAxiosError(error)) {
          setErrors({ general: error.response?.data?.message || 'Login failed' });
        }
        throw error;
      }
    },
    onSuccess: async (data) => {
      setAuth(data.user);
      await AsyncStorage.setItem('userToken', data.token);
      queryClient.setQueryData(['user'], data.user);
      setErrors({});
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const logout = async () => {
    setAuth(null);
    await AsyncStorage.removeItem('userToken');
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
