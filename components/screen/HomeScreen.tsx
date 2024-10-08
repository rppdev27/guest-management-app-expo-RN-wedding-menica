import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../context/authContext';  // Adjust the path as necessary
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);  // Get the logout function from AuthContext

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go To Guest"
        onPress={() => navigation.navigate('Guest')}
      />
      <Button
        title="Logout"
        onPress={logout}  // Call the logout function
        color="red"  // Optional: set the color to red to indicate logout
      />
    </View>
  );
};

export default HomeScreen;
