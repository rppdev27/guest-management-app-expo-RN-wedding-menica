import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

// React Query
const queryClient = new QueryClient();

// Context API
import { AuthContext, AuthProvider } from './context/authContext';

// Style
import { styles } from './styles';

// Screens
import LoginScreen from './components/screen/LoginScreen';
import SignupScreen from './components/screen/SignupScreen';
import HomeScreen from './components/screen/HomeScreen';
import GuestScreen from './components/screen/GuestScreen';

const Stack = createNativeStackNavigator();

// Main navigation component
const Navigation = () => {
  const { auth } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Beranda'
              }}
            />
            <Stack.Screen
              name="Guest"
              component={GuestScreen}
              options={{
                title: 'Daftar Tamu'
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </QueryClientProvider>
  );
}