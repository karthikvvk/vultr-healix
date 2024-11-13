import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      // Clear the JWT token from AsyncStorage
      await AsyncStorage.removeItem('token');
      
      // Navigate the user to the SignIn or Welcome screen
      navigation.replace('SignIn'); // or 'Welcome' depending on your desired flow
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: '#FF6347', borderRadius: 5 }}>
      <Text style={{ color: '#fff', fontSize: 16 }}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
