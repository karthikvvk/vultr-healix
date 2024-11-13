import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcome';
import HomeScreen from './screens/home';
import SignInPage from './screens/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token'); // Check if a token exists in AsyncStorage
      if (token) {
        setIsLoggedIn(true); // Set the logged-in state to true if a token is found
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Welcome"}>
        {/* Welcome screen for first-time users or when not logged in */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Hide header for Welcome screen
        />
        {/* SignIn page */}
        <Stack.Screen
          name="SignIn"
          component={SignInPage}
          options={{ title: 'Sign In' }} // Title for Sign In page
        />
        {/* Home screen for logged-in users */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header for Home screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
